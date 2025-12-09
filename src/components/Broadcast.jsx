import React, { useEffect, useState } from "react";
import { Check, Send } from "lucide-react";

const Broadcast = () => {
  /* ================= TEMPLATE STATE ================= */
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

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

  /* ================= RECIPIENT STATE ================= */
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        const normalized = data.leads.map(lead => ({
          name: lead.name || "Unknown",
          number: lead.number,
        }));

        setRecipients(normalized);
        setLoadingRecipients(false);
      })
      .catch(() => setLoadingRecipients(false));
  }, []);

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

  /* ================= BROADCAST ================= */
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBroadcast = () => {
    if (!selectedTemplate || selectedRecipients.length === 0) return;

    // ✅ FRONTEND → BACKEND PAYLOAD (INTENT ONLY)
    const payload = {
      template_id: selectedTemplate.id,
      template_name: selectedTemplate.name,
      language: selectedTemplate.language,
      recipients: selectedRecipients,
      parameters:
        selectedTemplate.param_count > 0
          ? new Array(selectedTemplate.param_count).fill("")
          : []
    };

    // ✅ Debug (VERY IMPORTANT)
    console.log("Broadcast Payload →", payload);


    fetch("http://localhost:8000/broadcast/send", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        showSuccessMessage();
      })
      .catch(err => console.error(err));

    // TEMP SUCCESS UI
    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedRecipients([]);
      setSelectedTemplate(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-gray-600">Send WhatsApp templates to users</p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 p-4 rounded flex gap-2">
          <Check className="text-green-600" />
          <p className="text-green-800">
            Broadcast queued for {selectedRecipients.length} recipients
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= TEMPLATE SELECTION ================= */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Select Template</h2>

          {loadingTemplates ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : (
            <div className="space-y-3">
              {templates.map(tpl => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-4 border-2 rounded cursor-pointer ${
                    selectedTemplate?.id === tpl.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h3 className="font-semibold">{tpl.name}</h3>
                  <p className="text-xs text-gray-500">
                    {tpl.category} · {tpl.language}
                  </p>
                  <p className="text-sm mt-2 whitespace-pre-line">
                    {tpl.body}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Params required: {tpl.param_count}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECIPIENT SELECTION ================= */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold">Recipients</h2>
            <button
              onClick={toggleSelectAll}
              className="text-blue-600 text-sm"
            >
              {selectedRecipients.length === recipients.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <p className="text-sm mb-3">
            <b>{selectedRecipients.length}</b> of{" "}
            <b>{recipients.length}</b> selected
          </p>

          {loadingRecipients ? (
            <p className="text-gray-500">Loading recipients...</p>
          ) : (
            <div className="space-y-2">
              {recipients.map(r => (
                <div
                  key={r.number}
                  onClick={() => toggleRecipient(r.number)}
                  className={`p-3 border-2 rounded cursor-pointer ${
                    selectedRecipients.includes(r.number)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-gray-600">{r.number}</p>
                </div>
              ))}
            </div>
          )}

          <button
            disabled={!selectedTemplate || selectedRecipients.length === 0}
            onClick={handleBroadcast}
            className={`w-full mt-5 py-3 rounded flex justify-center gap-2 ${
              selectedTemplate && selectedRecipients.length
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
            Send Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
