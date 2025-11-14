import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, User, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  roles: Array<{ role: string }>;
}

const Admin = () => {
  const { isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all users from auth.users via user_roles table
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      // Get unique user IDs
      const userIds = [...new Set(userRoles?.map(r => r.user_id) || [])];
      
      // For each user, we need to fetch their email from auth metadata
      // Since we can't directly query auth.users, we'll use the user_roles data
      const usersWithRoles: UserWithRole[] = [];
      
      for (const userId of userIds) {
        const userRolesList = userRoles?.filter(r => r.user_id === userId) || [];
        
        // We can only get full user data for the current user
        // For other users, we'll show limited info
        const isCurrentUser = userId === user?.id;
        
        usersWithRoles.push({
          id: userId,
          email: isCurrentUser ? (user?.email || "Usuario") : `Usuario (${userId.slice(0, 8)}...)`,
          created_at: new Date().toISOString(),
          roles: userRolesList.map(r => ({ role: r.role })),
        });
      }

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast({
        title: "Error al cargar usuarios",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentRoles: Array<{ role: string }>) => {
    try {
      setActionLoading(userId);
      const hasAdmin = currentRoles.some(r => r.role === "admin");

      if (hasAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");

        if (error) throw error;

        toast({
          title: "Rol removido",
          description: "El rol de administrador ha sido removido",
        });
      } else {
        // Add admin role
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });

        if (error) throw error;

        toast({
          title: "Rol asignado",
          description: "El usuario ahora es administrador",
        });
      }

      await fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Panel de Administración
            </CardTitle>
            <CardDescription>
              Gestiona usuarios y asigna roles de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No hay usuarios registrados</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => {
                      const hasAdmin = userData.roles.some(r => r.role === "admin");
                      const isCurrentUser = userData.id === user?.id;

                      return (
                        <TableRow key={userData.id}>
                          <TableCell className="font-medium">
                            {userData.email}
                            {isCurrentUser && (
                              <Badge variant="outline" className="ml-2">
                                Tú
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {userData.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {userData.roles.map((r, idx) => (
                                <Badge
                                  key={idx}
                                  variant={r.role === "admin" ? "default" : "secondary"}
                                >
                                  {r.role}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant={hasAdmin ? "destructive" : "default"}
                              onClick={() => toggleAdminRole(userData.id, userData.roles)}
                              disabled={actionLoading === userData.id || isCurrentUser}
                            >
                              {actionLoading === userData.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : hasAdmin ? (
                                "Remover Admin"
                              ) : (
                                "Hacer Admin"
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Nota importante
              </h3>
              <p className="text-sm text-muted-foreground">
                Por limitaciones de seguridad, solo puedes ver el email completo de tu propio usuario. 
                Los demás usuarios se muestran con su ID. Los usuarios se gestionan automáticamente al 
                registrarse en la aplicación.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
