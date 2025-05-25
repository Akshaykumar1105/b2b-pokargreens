import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./AuthContext";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("authToken");
  const [userData, setUserData] = useState(null);
  const { toast } = useToast();
  const [editAddress, setEditAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://businessapi.pokargreens.com/api/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUserData(data);
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching user data:', error);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  };

  const user = userData || currentUser || {};

  return (
    <>
      <Header />
      <div className="container mt-12 mx-auto px-4 py-8 ">


        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <ProfileField
                icon={<UserIcon className="w-4 h-4 text-green-500" />}
                label="Full Name"
                value={user.name}
              />
              <ProfileField
                icon={<MailIcon className="w-4 h-4 text-green-500" />}
                label="Email Address"
                value={user.email}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <PhoneIcon className="w-6 h-6 text-green-600" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <ProfileField
                icon={<PhoneIcon className="w-4 h-4 text-green-500" />}
                label="Phone Number"
                value={user.mobile}
              />
              <div className="relative">
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-green-500" /> Address
                    </label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setEditAddress('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                         size="sm"
                         className="bg-green-600 hover:bg-green-700 text-white"
                         onClick={async () => {
                           try {
                             const response = await fetch('https://businessapi.pokargreens.com/api/v1/me', {
                                method: 'POST',
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json',
                                  'Accept': 'application/json'
                                },
                                body: JSON.stringify({ name: user.name, mobile: user.mobile, address: editAddress })
                             });
                             if (!response.ok) throw new Error('Failed to update address');
                             const updatedData = { ...userData, name: user.name, mobile: user.mobile, address: editAddress };
                             setUserData(updatedData);
                             const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                             const updatedUser = { ...currentUser, name: user.name, mobile: user.mobile, address: editAddress };
                             localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                             localStorage.setItem('userData', JSON.stringify(updatedData));
                             await fetchUserData();
                             setIsEditing(false);
                             toast({
                               title: 'Success',
                               description: 'Address updated successfully',
                               variant: 'success',
                             });
                           } catch (error) {
                             console.error('Error updating address:', error);
                             toast({
                               title: 'Error',
                               description: 'Failed to update address. Please try again.',
                               variant: 'destructive',
                             });
                           }
                         }}
                       >
                         Save
                       </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ProfileField
                      icon={<MapPinIcon className="w-4 h-4 text-green-500" />}
                      label="Address"
                      value={user.address}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-0 right-0 flex items-center gap-1"
                      onClick={() => {
                        setEditAddress(user.address || '');
                        setIsEditing(true);
                      }}
                    >
                      <PencilIcon className="w-4 h-4" /> Edit
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Profile Field Component
const ProfileField = ({ icon, label, value }) => (
  <div className="group">
    <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
      {icon} {label}
    </label>
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 group-hover:border-green-200 group-hover:bg-green-50/50 transition-colors duration-200">
      <p className="text-gray-800 font-medium">{value || "Not provided"}</p>
    </div>
  </div>
);

export default ProfilePage;
