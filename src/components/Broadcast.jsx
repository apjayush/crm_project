import React, { useEffect, useState } from "react";
import { Check, Send, Plus, X } from "lucide-react";

const Broadcast = () => {
  /* ================= TEMPLATE STATE ================= */
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  /* ================= CREATE TEMPLATE MODAL ================= */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingTemplate, setCreatingTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "MARKETING",
    language: "en_US",
    body: "",
    footer: "",
    headerImage: null
  });

  /* ================= RECIPIENT STATE ================= */
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ================= NOTIFICATION STATE ================= */
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  /* ================= FETCH TEMPLATES ================= */
  useEffect(() => {
    fetch("http://localhost:8000/message-templates", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
        setLoadingTemplates(false);
      })
      .catch(() => setLoadingTemplates(false));
  }, []);

  /* ================= FETCH RECIPIENTS ================= */
  useEffect(() => {
    fetch("http://localhost:8000/dashboard", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        const normalized = data.leads.map(l => ({
          name: l.name || "Unknown",
          number: l.number,
        }));
        setRecipients(normalized);
        setLoadingRecipients(false);
      })
      .catch(() => setLoadingRecipients(false));
  }, []);

  /* ================= HELPERS ================= */
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4000);
  };

  const toggleRecipient = (number) => {
    setSelectedRecipients(prev =>
      prev.includes(number)
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRecipients(
      selectedRecipients.length === recipients.length
        ? []
        : recipients.map(r => r.number)
    );
  };

  /* ================= SEND BROADCAST ================= */
  const handleBroadcast = () => {
    if (!selectedTemplate || selectedRecipients.length === 0) return;

    if (selectedTemplate.param_count > 0) {
      showNotification('error', 'Parameterized templates cannot be broadcast.');
      return;
    }

    fetch("http://localhost:8000/broadcast/send", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template_id: selectedTemplate.id,
        recipients: selectedRecipients,
        has_header: selectedTemplate.has_header,
        template_name: selectedTemplate.name,
        template_language: selectedTemplate.language
      }),
    })
      .then(() => {
        setShowSuccess(true);
        showNotification('success', 'Broadcast queued successfully!');
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedRecipients([]);
          setSelectedTemplate(null);
        }, 3000);
      })
      .catch(() => showNotification('error', 'Failed to send broadcast. Please try again.'));
  };

  /* ================= CREATE TEMPLATE ================= */
  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.body.trim()) {
      showNotification('error', 'Template name and body are required');
      return;
    }

    setCreatingTemplate(true);

    const form = new FormData();
    form.append("name", newTemplate.name.trim());
    form.append("category", newTemplate.category);
    form.append("language", newTemplate.language);
    form.append("body", newTemplate.body);
    form.append("footer", newTemplate.footer || "");

    if (newTemplate.headerImage) {
      form.append("media", newTemplate.headerImage);
    }

    fetch("http://localhost:8000/templates/create", {
      method: "POST",
      credentials: "include",
      body: form,
    })
      .then((res) => res.json())
      .then(() => {
        // Close modal immediately
        setShowCreateModal(false);
        setCreatingTemplate(false);
        
        // Reset form
        setNewTemplate({
          name: "",
          category: "MARKETING",
          language: "en_US",
          body: "",
          footer: "",
          headerImage: null,
        });
        
        // Show success notification
        showNotification('success', 'Template submitted for review successfully!');
        
        // Refresh templates list
        fetch("http://localhost:8000/message-templates", {
          credentials: "include",
        })
          .then(res => res.json())
          .then(data => setTemplates(data))
          .catch(console.error);
      })
      .catch(() => {
        setCreatingTemplate(false);
        showNotification('error', 'Failed to create template. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* MODERN NOTIFICATION TOAST */}
        {notification.show && (
          <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top duration-300">
            <div className={`rounded-lg shadow-2xl p-4 flex items-center gap-3 min-w-[300px] border-l-4 ${
              notification.type === 'success' 
                ? 'bg-white border-green-500' 
                : notification.type === 'error'
                ? 'bg-white border-red-500'
                : 'bg-white border-blue-500'
            }`}>
              <div className={`rounded-full p-1.5 ${
                notification.type === 'success'
                  ? 'bg-green-100'
                  : notification.type === 'error'
                  ? 'bg-red-100'
                  : 'bg-blue-100'
              }`}>
                {notification.type === 'success' ? (
                  <Check size={18} className="text-green-600" />
                ) : notification.type === 'error' ? (
                  <X size={18} className="text-red-600" />
                ) : (
                  <Check size={18} className="text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium text-sm ${
                  notification.type === 'success'
                    ? 'text-green-800'
                    : notification.type === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification({ show: false, type: '', message: '' })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Broadcast Messages</h1>
            <p className="text-gray-600 mt-1">Send WhatsApp messages to multiple recipients</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md font-medium"
          >
            <Plus size={18} />
            Create Template
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <div className="bg-green-600 rounded-full p-1">
              <Check className="text-white" size={20} />
            </div>
            <span className="text-green-800 font-medium">Broadcast queued successfully!</span>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TEMPLATES */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Message Templates</h2>

            {loadingTemplates ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-500">Loading templates...</p>
              </div>
            ) : templates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No templates available</p>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {templates.map(tpl => (
                  <div
                    key={tpl.id}
                    onClick={() => tpl.param_count === 0 && setSelectedTemplate(tpl)}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                      tpl.param_count > 0
                        ? "opacity-50 cursor-not-allowed bg-gray-50"
                        : selectedTemplate?.id === tpl.id
                        ? "border-blue-500 bg-blue-50 cursor-pointer shadow-md"
                        : "border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{tpl.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tpl.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : tpl.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tpl.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {tpl.category}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {tpl.language}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line line-clamp-3">
                      {tpl.body}
                    </p>
                    {tpl.param_count > 0 && (
                      <p className="text-xs text-red-500 mt-2">
                        ⚠ Contains parameters - cannot broadcast
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECIPIENTS */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Recipients
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({selectedRecipients.length} selected)
                </span>
              </h2>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
              >
                {selectedRecipients.length === recipients.length
                  ? "Clear all"
                  : "Select all"}
              </button>
            </div>

            {loadingRecipients ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-500">Loading recipients...</p>
              </div>
            ) : recipients.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recipients available</p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 mb-4">
                {recipients.map(r => (
                  <div
                    key={r.number}
                    onClick={() => toggleRecipient(r.number)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedRecipients.includes(r.number)
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{r.name}</p>
                        <p className="text-sm text-gray-600">{r.number}</p>
                      </div>
                      {selectedRecipients.includes(r.number) && (
                        <Check size={20} className="text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={!selectedTemplate || selectedRecipients.length === 0}
              onClick={handleBroadcast}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <Send size={18} />
              Send Broadcast to {selectedRecipients.length} recipient{selectedRecipients.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>

        {/* CREATE TEMPLATE MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative animate-in fade-in duration-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                Create WhatsApp Template
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Submit a new template for WhatsApp approval
              </p>

              <div className="space-y-4">
                {/* Template name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Name *
                  </label>
                  <input
                    placeholder="e.g., veggies_promo"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newTemplate.name}
                    onChange={e =>
                      setNewTemplate({ ...newTemplate, name: e.target.value })
                    }
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newTemplate.category}
                    onChange={e =>
                      setNewTemplate({ ...newTemplate, category: e.target.value })
                    }
                  >
                    <option value="MARKETING">Marketing</option>
                    <option value="UTILITY">Utility</option>
                    <option value="AUTHENTICATION">Authentication</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newTemplate.language}
                    onChange={e =>
                      setNewTemplate({ ...newTemplate, language: e.target.value })
                    }
                  >
                    <option value="en_US">English (US)</option>
                    <option value="en_GB">English (UK)</option>
                  </select>
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Text *
                  </label>
                  <textarea
                    placeholder="Enter your message (no variables)"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={4}
                    value={newTemplate.body}
                    onChange={e =>
                      setNewTemplate({ ...newTemplate, body: e.target.value })
                    }
                  />
                </div>

                {/* Footer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer (optional)
                  </label>
                  <input
                    placeholder="Add a footer text"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newTemplate.footer}
                    onChange={e =>
                      setNewTemplate({ ...newTemplate, footer: e.target.value })
                    }
                  />
                </div>

                {/* Header image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Header Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      setNewTemplate({
                        ...newTemplate,
                        headerImage: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateTemplate}
                disabled={creatingTemplate}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-green-600 disabled:cursor-not-allowed font-medium mt-6 transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
              >
                {creatingTemplate ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit for Review</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Broadcast;