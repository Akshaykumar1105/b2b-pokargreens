import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Protect this route - redirect to home if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-gray-800">Welcome, {currentUser.name || 'User'}!</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Your recent orders</CardDescription>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-green-600">0</CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/orders')}>View All Orders</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>Items in your wishlist</CardDescription>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-green-600">0</CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/wishlist')}>View Wishlist</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cart</CardTitle>
                  <CardDescription>Items in your cart</CardDescription>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-green-600">0</CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/cart')}>View Cart</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="truncate">{currentUser.email}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>Edit Profile</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions on the site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activity to display</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xl mb-4">No orders yet</p>
                  <p className="mb-6">When you place orders, they will appear here</p>
                  <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Account Information</h3>
                    <p className="text-sm text-gray-500">Name: {currentUser.name || 'Not provided'}</p>
                    <p className="text-sm text-gray-500">Email: {currentUser.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Account Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/change-password')}>
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;