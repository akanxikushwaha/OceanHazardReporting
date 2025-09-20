import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Plus,
  Edit2,
  Trash2,
  Search,
  AlertCircle
} from 'lucide-react';

const AlertAuthorities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Santa Monica Emergency Services',
      organization: 'Santa Monica Fire Department',
      location: 'Santa Monica, CA',
      phone: '+1 (310) 458-8491',
      email: 'emergency@santamonica.gov',
      type: 'Fire Department',
      responseTime: '3-5 mins',
      available24h: true,
      lastContact: '2025-01-08 14:30'
    },
    {
      id: 2,
      name: 'Miami-Dade Emergency Management',
      organization: 'Miami-Dade County',
      location: 'Miami, FL',
      phone: '+1 (305) 468-5400',
      email: 'eoc@miamidade.gov',
      type: 'Emergency Management',
      responseTime: '5-10 mins',
      available24h: true,
      lastContact: '2025-01-09 09:15'
    },
    {
      id: 3,
      name: 'US Coast Guard Station',
      organization: 'United States Coast Guard',
      location: 'Monterey, CA',
      phone: '+1 (831) 647-7300',
      email: 'monterey@uscg.mil',
      type: 'Coast Guard',
      responseTime: '10-15 mins',
      available24h: true,
      lastContact: '2025-01-07 16:45'
    },
    {
      id: 4,
      name: 'Galveston Emergency Operations',
      organization: 'City of Galveston',
      location: 'Galveston, TX',
      phone: '+1 (409) 797-3510',
      email: 'eoc@galvestontx.gov',
      type: 'Emergency Operations',
      responseTime: '5-8 mins',
      available24h: true,
      lastContact: '2025-01-10 11:20'
    },
    {
      id: 5,
      name: 'Oregon State Police',
      organization: 'Marine Board Division',
      location: 'Portland, OR',
      phone: '+1 (503) 378-8587',
      email: 'marine.board@oregon.gov',
      type: 'Marine Police',
      responseTime: '15-20 mins',
      available24h: false,
      lastContact: '2025-01-06 13:00'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Fire Department': return '#183642';
      case 'Emergency Management': return '#313D5A';
      case 'Coast Guard': return '#73628A';
      case 'Emergency Operations': return '#73628A';
      case 'Marine Police': return '#313D5A';
      default: return '#EAEAEA';
    }
  };

  const filteredContacts = emergencyContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#313D5A' }}>Alert Authorities</h1>
        <p className="text-gray-600 mt-2">Manage emergency contacts and communication channels</p>
      </div>

      {/* Search and Add */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: '#73628A' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90 ml-4"
          style={{ backgroundColor: '#73628A' }}
        >
          <Plus size={16} className="mr-2" />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold mr-3" style={{ color: '#313D5A' }}>
                        {contact.name}
                      </h3>
                      {contact.available24h && (
                        <span 
                          className="px-2 py-1 rounded text-xs text-white"
                          style={{ backgroundColor: '#73628A' }}
                        >
                          24/7
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{contact.organization}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {contact.location}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2" style={{ color: '#73628A' }} />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2" style={{ color: '#73628A' }} />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: getTypeColor(contact.type) }}
                    >
                      {contact.type}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock size={12} className="mr-1" />
                      Response: {contact.responseTime}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details / Quick Actions */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#313D5A' }}>
                Contact Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold" style={{ color: '#313D5A' }}>{selectedContact.name}</h4>
                  <p className="text-sm text-gray-600">{selectedContact.organization}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2" style={{ color: '#73628A' }} />
                    <span className="text-sm">{selectedContact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2" style={{ color: '#73628A' }} />
                    <span className="text-sm">{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" style={{ color: '#73628A' }} />
                    <span className="text-sm">{selectedContact.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#183642' }}
                >
                  <AlertCircle size={16} className="mr-2" />
                  Send Alert
                </button>
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#73628A' }}
                >
                  <Phone size={16} className="mr-2" />
                  Quick Call
                </button>
                <button 
                  className="w-full flex items-center justify-center px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#CBC5EA', color: '#313D5A' }}
                >
                  <Mail size={16} className="mr-2" />
                  Send Email
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center text-gray-500">
                <Phone size={48} className="mx-auto mb-4" style={{ color: '#CBC5EA' }} />
                <p>Select a contact to view details and quick actions</p>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#313D5A' }}>
              Emergency Contacts Overview
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Contacts</span>
                <span className="font-semibold" style={{ color: '#313D5A' }}>
                  {emergencyContacts.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24/7 Available</span>
                <span className="font-semibold" style={{ color: '#313D5A' }}>
                  {emergencyContacts.filter(c => c.available24h).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="font-semibold" style={{ color: '#313D5A' }}>
                  8 mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertAuthorities;