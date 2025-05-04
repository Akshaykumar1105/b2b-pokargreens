import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./AuthContext";
import Header from "@/components/Header";
import { UserIcon, MailIcon, PhoneIcon, CalendarIcon, MapPinIcon, CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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
                value={user.phone}
              />
              <ProfileField
                icon={<MapPinIcon className="w-4 h-4 text-green-500" />}
                label="Address"
                value={user.address}
              />
              <ProfileField
                icon={<CalendarIcon className="w-4 h-4 text-green-500" />}
                label="Member Since"
                value={user.joinDate || new Date().toLocaleDateString()}
              />
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
