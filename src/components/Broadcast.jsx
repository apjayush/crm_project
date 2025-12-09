import React, { useEffect, useState } from "react";
import { Check, Send } from "lucide-react";

const Broadcast = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  /* ✅ FETCH WHATSAPP TEMPLATES */
  useEffect(() => {
    fetch("http://localhost:8000/message-templates", {
      credentials: "include", // ✅ JWT in cookies
    })
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoadingTemplates(false);
      })
      .catch((err) => {
        console.error("Failed to fetch templates", err);
        setLoadingTemplates(false);
      });
  }, []);

  /* ✅ RECIPIENTS (TEMP DATA) */
  const dbUsers = [
    { id: 1, name: "John Doe", phone: "+91 98765 43210", segment: "Premium" },
    { id: 2, name: "Jane Smith", phone: "+91 98765 43211", segment: "Standard" },
    { id: 3, name: "Mike Johnson", phone: "+91 98765 43212", segment: "Premium" },
    { id: 4, name: "Sarah Williams", phone: "+91 98765 43213", segment: "Standard" }
  ];

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === dbUsers.length ? [] : dbUsers.map((u) => u.id)
    );
  };

  const handleBroadcast = () => {
    if (!selectedTemplate || selectedUsers.length === 0) return;

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedTemplate(null);
      setSelectedUsers([]);
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
            Broadcast queued for {selectedUsers.length} users
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✅ TEMPLATE SELECTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Select Template</h2>

          {loadingTemplates ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : (
            <div className="space-y-3">
              {templates.map((tpl) => (
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
                  <p className="text-sm mt-2 whitespace-pre-line">{tpl.body}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Params required: {tpl.param_count}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ RECIPIENT SELECTION */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold">Recipients</h2>
            <button onClick={toggleSelectAll} className="text-blue-600 text-sm">
              {selectedUsers.length === dbUsers.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <p className="text-sm mb-3">
            <b>{selectedUsers.length}</b> of <b>{dbUsers.length}</b> selected
          </p>

          <div className="space-y-2">
            {dbUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => toggleUser(user.id)}
                className={`p-3 border-2 rounded cursor-pointer ${
                  selectedUsers.includes(user.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <span className="text-xs bg-purple-100 px-2 rounded">
                  {user.segment}
                </span>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedTemplate || selectedUsers.length === 0}
            onClick={handleBroadcast}
            className={`w-full mt-5 py-3 rounded flex justify-center gap-2 ${
              selectedTemplate && selectedUsers.length
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
