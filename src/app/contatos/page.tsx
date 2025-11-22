'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { Phone, Plus, Trash2, Edit2, Save, X, UserPlus, Shield } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  // Carregar contatos do localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('trustedContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Salvar contatos no localStorage
  const saveContacts = (newContacts: Contact[]) => {
    localStorage.setItem('trustedContacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const handleAdd = () => {
    if (formData.name && formData.phone) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        relationship: formData.relationship || 'Contato de confiança'
      };
      saveContacts([...contacts, newContact]);
      setFormData({ name: '', phone: '', relationship: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    });
  };

  const handleUpdate = () => {
    if (editingId && formData.name && formData.phone) {
      const updatedContacts = contacts.map(contact =>
        contact.id === editingId
          ? { ...contact, ...formData }
          : contact
      );
      saveContacts(updatedContacts);
      setEditingId(null);
      setFormData({ name: '', phone: '', relationship: '' });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este contato?')) {
      saveContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', phone: '', relationship: '' });
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4 shadow-lg">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Sua Rede de Apoio
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contatos de Confiança
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Cadastre pessoas que podem te ajudar em momentos de crise
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                  Como funciona?
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Cadastre amigos, familiares ou pessoas de confiança. Na página SOS, você poderá 
                  ligar rapidamente para eles quando precisar de apoio emocional.
                </p>
              </div>
            </div>
          </div>

          {/* Add Button */}
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-8"
            >
              <Plus className="w-5 h-5" />
              Adicionar Novo Contato
            </button>
          )}

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl mb-8 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
                {editingId ? 'Editar Contato' : 'Novo Contato'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Maria Silva"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: (11) 98765-4321"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relação (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    placeholder="Ex: Mãe, Melhor amigo, Terapeuta..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={editingId ? handleUpdate : handleAdd}
                    disabled={!formData.name || !formData.phone}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? 'Salvar Alterações' : 'Adicionar Contato'}
                  </button>
                  
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contacts List */}
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-xl">
                <UserPlus className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Nenhum contato cadastrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adicione pessoas de confiança que podem te apoiar em momentos difíceis
                </p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {contact.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </p>
                      <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">
                        {contact.relationship}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Help Text */}
          {contacts.length > 0 && (
            <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
              <p className="text-green-900 dark:text-green-100 text-center">
                <strong>✓ Contatos salvos!</strong> Você pode acessá-los rapidamente na página SOS quando precisar.
              </p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
