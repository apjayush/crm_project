import React, { useEffect, useState } from "react";
import { Check, Send, Plus, X } from "lucide-react";

const Broadcast = () => {
  /* ================= TEMPLATE STATE ================= */
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  /* ================= CREATE TEMPLATE MODAL ================= */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "MARKETING",     // maps to payload.category
    language: "en_US",         // use full code for WhatsApp payload
    body: "",
    footer: "",
    headerImage: null          // optional image header
  });

  /* ================= RECIPIENT STATE ================= */
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

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

    // If you store param_count from backend, keep this safety:
    if (selectedTemplate.param_count > 0) {
      alert("Parameterized templates cannot be broadcast.");
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
        // header_format: selectedTemplate.header_format
      }),
    })
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedRecipients([]);
          setSelectedTemplate(null);
        }, 3000);
      })
      .catch(console.error);
  };

  /* ================= CREATE TEMPLATE ================= */
  /* ================= CREATE TEMPLATE ================= */
const handleCreateTemplate = () => {
  if (!newTemplate.name.trim() || !newTemplate.body.trim()) {
    alert("Name and body are required");
    return;
  }

  // ✅ Use FormData (matches backend Form(...) + File(...))
  const form = new FormData();
  form.append("name", newTemplate.name.trim());
  form.append("category", newTemplate.category);
  form.append("language", newTemplate.language);
  form.append("body", newTemplate.body);
  form.append("footer", newTemplate.footer || "");

  // ✅ IMPORTANT: send image file as "media" if present
  if (newTemplate.headerImage) {
    form.append("media", newTemplate.headerImage);
  }

  fetch("http://localhost:8000/templates/create", {
    method: "POST",
    credentials: "include",
    body: form, // let browser set multipart/form-data
  })
    .then((res) => res.json())
    .then(() => {
      setShowCreateModal(false);
      setNewTemplate({
        name: "",
        category: "MARKETING",
        language: "en_US",
        body: "",
        footer: "",
        headerImage: null,
      });
      alert("Template submitted for review");
    })
    .catch(console.error);
};




  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus size={18} />
          Create Template
        </button>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 p-4 rounded flex gap-2">
          <Check className="text-green-600" />
          Broadcast queued successfully
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TEMPLATES */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Templates</h2>

          {loadingTemplates ? (
            <p>Loading…</p>
          ) : (
            templates.map(tpl => (
              <div
                key={tpl.id}
                onClick={() => tpl.param_count === 0 && setSelectedTemplate(tpl)}
                className={`p-4 border rounded mb-3 ${
                  tpl.param_count > 0
                    ? "opacity-50 cursor-not-allowed"
                    : selectedTemplate?.id === tpl.id
                    ? "border-blue-500 bg-blue-50 cursor-pointer"
                    : "border-gray-200 cursor-pointer"
                }`}
              >
                <h3 className="font-semibold">{tpl.name}</h3>
                <p className="text-xs text-gray-500">
                  {tpl.category} · {tpl.language} · {tpl.status}
                </p>
                <p className="text-sm mt-2 whitespace-pre-line">{tpl.body}</p>
              </div>
            ))
          )}
        </div>

        {/* RECIPIENTS */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Recipients
            <button
              type="button"
              onClick={toggleSelectAll}
              className="text-xs text-blue-600 underline"
            >
              {selectedRecipients.length === recipients.length
                ? "Clear all"
                : "Select all"}
            </button>
          </h2>

          {loadingRecipients ? (
            <p>Loading…</p>
          ) : (
            recipients.map(r => (
              <div
                key={r.number}
                onClick={() => toggleRecipient(r.number)}
                className={`p-3 border rounded mb-2 cursor-pointer ${
                  selectedRecipients.includes(r.number)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <p className="font-medium">{r.name}</p>
                <p className="text-sm">{r.number}</p>
              </div>
            ))
          )}

          <button
            disabled={!selectedTemplate || selectedRecipients.length === 0}
            onClick={handleBroadcast}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send size={18} className="inline mr-2" />
            Send Broadcast
          </button>
        </div>
      </div>

      {/* CREATE TEMPLATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/35 transition-opacity duration-200 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Create WhatsApp Template
            </h2>

            {/* Template name */}
            <input
              placeholder="Template Name (e.g. veggies_promo)"
              className="w-full border p-2 rounded mb-3"
              value={newTemplate.name}
              onChange={e =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />

            {/* Category */}
            <select
              className="w-full border p-2 rounded mb-3"
              value={newTemplate.category}
              onChange={e =>
                setNewTemplate({ ...newTemplate, category: e.target.value })
              }
            >
              <option value="MARKETING">Marketing</option>
              <option value="UTILITY">Utility</option>
              <option value="AUTHENTICATION">Authentication</option>
            </select>

            {/* Language */}
            <select
              className="w-full border p-2 rounded mb-3"
              value={newTemplate.language}
              onChange={e =>
                setNewTemplate({ ...newTemplate, language: e.target.value })
              }
            >
              <option value="en_US">English (US)</option>
              <option value="en_GB">English (UK)</option>
              {/* add more codes as needed */}
            </select>

            {/* Body */}
            <textarea
              placeholder="Body Text (static, no variables)"
              className="w-full border p-2 rounded mb-3"
              rows={4}
              value={newTemplate.body}
              onChange={e =>
                setNewTemplate({ ...newTemplate, body: e.target.value })
              }
            />

            {/* Footer */}
            <input
              placeholder="Footer (optional, static)"
              className="w-full border p-2 rounded mb-3"
              value={newTemplate.footer}
              onChange={e =>
                setNewTemplate({ ...newTemplate, footer: e.target.value })
              }
            />

            {/* Header image (optional) */}
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                setNewTemplate({
                  ...newTemplate,
                  headerImage: e.target.files?.[0] || null,
                })
              }
              className="mb-4"
            />

            <button
              onClick={handleCreateTemplate}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit for Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadcast;
