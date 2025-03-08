import React, { useState } from 'react';
import { HiOutlinePencil, HiOutlineSave } from 'react-icons/hi';
import { LanguageSelector } from "../components/LanguageSelector";
import { useToast } from "../hooks/use-toast";
import { useTranslation } from '../hooks/useTranslation';

const Profile = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [farmerData, setFarmerData] = useState({
    fullName: t('profile1.data.fullName'),
    email: t('profile1.data.email'),
    phone: t('profile1.data.phone'),
    location: t('profile1.data.location'),
    farmName: t('profile1.data.farmName'),
    experience: t('profile1.data.experience'),
    productsGrown: [
      t('profile1.data.productsGrown.0'),
      t('profile1.data.productsGrown.1'),
      t('profile1.data.productsGrown.2'),
      t('profile1.data.productsGrown.3'),
      t('profile1.data.productsGrown.4')
    ],
    socialMedia: {
      facebook: t('profile1.data.socialMedia.facebook'),
      instagram: t('profile1.data.socialMedia.instagram'),
      twitter: t('profile1.data.socialMedia.twitter'),
    },
    rating: 4.5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFarmerData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent as keyof typeof prevState] as Record<string, any>,
          [child]: value
        }
      }));
    } else if (name === 'productsGrown') {
      const productsArray = value.split(',').map(product => product.trim());
      setFarmerData(prevState => ({
        ...prevState,
        [name]: productsArray
      }));
    } else {
      setFarmerData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    toast({
      title: t('profile1.profileSaved'),
      description: t('profile1.profileUpdated'),
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
          
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-6">
            <div className="avatar">
              <div className="w-36 h-40 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/12903019/pexels-photo-12903019.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Farmer Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow space-y-2">
              <h2 className="text-xl font-semibold">{farmerData.fullName}</h2>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={farmerData.email}
                    onChange={handleInputChange}
                    className="text-sm text-gray-600 border rounded p-1"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={farmerData.phone}
                    onChange={handleInputChange}
                    className="text-sm text-gray-600 border rounded p-1"
                  />
                  <input
                    type="text"
                    name="location"
                    value={farmerData.location}
                    onChange={handleInputChange}
                    className="text-sm text-gray-600 border rounded p-1"
                  />
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-600">{farmerData.email}</span>
                  <span className="text-sm text-gray-600">{farmerData.phone}</span>
                  <span className="text-sm text-gray-600">{farmerData.location}</span>
                </>
              )}
              <span className="text-sm text-yellow-500">
                {farmerData.rating} ⭐
              </ span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('profile1.additionalInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>{t('profile1.labels.farmName')}:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="farmName"
                    value={farmerData.farmName}
                    onChange={handleInputChange}
                    className="border rounded p-1 mt-1 w-full"
                  />
                ) : (
                  farmerData.farmName
                )}
              </div>
              <div>
                <strong>{t('profile1.labels.experience')}:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={farmerData.experience}
                    onChange={handleInputChange}
                    className="border rounded p-1 mt-1 w-full"
                  />
                ) : (
                  farmerData.experience
                )}
              </div>
              <div>
                <strong>{t('profile1.labels.productsGrown')}:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="productsGrown"
                    value={farmerData.productsGrown.join(', ')}
                    onChange={handleInputChange}
                    className="border rounded p-1 mt-1 w-full"
                  />
                ) : (
                  farmerData.productsGrown.join(', ')
                )}
              </div>
              <div>
                <strong>{t('profile1.labels.socialMedia')}:</strong>
                {isEditing ? (
                  <div className="flex flex-col space-y-2 mt-1">
                    <div className="flex items-center">
                      <span className="w-24 text-sm">{t('profile1.labels.facebook')}:</span>
                      <input
                        type="text"
                        name="socialMedia.facebook"
                        value={farmerData.socialMedia.facebook}
                        onChange={handleInputChange}
                        className="border rounded p-1 flex-grow"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">{t('profile1.labels.instagram')}:</span>
                      <input
                        type="text"
                        name="socialMedia.instagram"
                        value={farmerData.socialMedia.instagram}
                        onChange={handleInputChange}
                        className="border rounded p-1 flex-grow"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">{t('profile1.labels.twitter')}:</span>
                      <input
                        type="text"
                        name="socialMedia.twitter"
                        value={farmerData.socialMedia.twitter}
                        onChange={handleInputChange}
                        className="border rounded p-1 flex-grow"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <a href={farmerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {t('profile1.labels.facebook')}
                    </a>
                    <a href={farmerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                      {t('profile1.labels.instagram')}
                    </a>
                    <a href={farmerData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {t('profile1.labels.twitter')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                <HiOutlineSave className="mr-2 text-lg" /> {t('profile1.saveProfile')}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <HiOutlinePencil className="mr-2 text-lg" /> {t('profile1.editProfile')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;