'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Zap } from 'lucide-react';

export default function SubmitAgentForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    model: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { name, description, model, category } = form;

    if (!name || !description || !model || !category) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/v1/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Agent uploaded! Tx Hash: ${data.txHash}`);
        setForm({ name: '', description: '', model: '', category: '' });
        setOpen(false);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to submit agent');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        size="lg"
        variant="outline"
        onClick={() => setOpen(!open)}
        className="border-purple-600/50 text-purple-500 hover:bg-purple-600/10 hover:border-purple-500 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
      >
        <Zap className="w-5 h-5 mr-2" />
        Submit Yours
      </Button>

      {open && (
        <div className="mt-6 space-y-4 p-4 border rounded-lg shadow bg-white max-w-md text-black">
          <Input
            placeholder="Agent Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            placeholder="Model (e.g. GPT-4)"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <Input
            placeholder="Category (e.g. Chatbot, Assistant)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 text-white hover:bg-purple-700"
          >
            {loading ? 'Submitting...' : 'Submit Agent'}
          </Button>
        </div>
      )}
    </div>
  );
}
