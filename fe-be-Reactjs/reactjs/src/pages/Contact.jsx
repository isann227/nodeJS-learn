import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Contact() {
  const [items, setItems] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone_number: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({}); // { email: '...', phone_number: '...' }

  const load = async () => {
    const { data } = await api.get("/contacts");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitAdd = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.post("/contacts", form);
      setAddOpen(false);
      setForm({ name: "", phone_number: "", email: "" });
      load();
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors(err.response.data.errors || {});
      }
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.put(`/contacts/${editId}`, form);
      setEditOpen(false);
      setEditId(null);
      setForm({ name: "", phone_number: "", email: "" });
      load();
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors(err.response.data.errors || {});
      }
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Yakin hapus kontak ini?")) return;
    await api.delete(`/contacts/${id}`);
    load();
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, phone_number: item.phone_number, email: item.email });
    setErrors({});
    setEditOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Kontak</h2>
        <button onClick={()=>{setAddOpen(true); setErrors({});}}
          className="bg-blue-600 text-white px-4 py-2 rounded">+ Tambah Kontak</button>
      </div>

      <table className="table-auto border border-gray-300 w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">No</th>
            <th className="border px-3 py-2">Nama</th>
            <th className="border px-3 py-2">Telepon</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c, i) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{i+1}</td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">{c.phone_number}</td>
              <td className="border px-3 py-2">{c.email}</td>
              <td className="border px-3 py-2 text-center">
                <div className="inline-flex gap-2">
                  <button onClick={()=>openEdit(c)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={()=>onDelete(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Tambah */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Tambah Kontak</h3>
            <form onSubmit={submitAdd} className="space-y-3">
              <div>
                <input name="name" value={form.name} onChange={onChange}
                  placeholder="Nama" className="border p-2 w-full rounded" required/>
              </div>
              <div>
                <input name="phone_number" value={form.phone_number} onChange={onChange}
                  placeholder="Telepon" className="border p-2 w-full rounded" required/>
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
              </div>
              <div>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  placeholder="Email" className="border p-2 w-full rounded" required/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={()=>setAddOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Batal</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Edit Kontak</h3>
            <form onSubmit={submitEdit} className="space-y-3">
              <div>
                <input name="name" value={form.name} onChange={onChange}
                  placeholder="Nama" className="border p-2 w-full rounded" required/>
              </div>
              <div>
                <input name="phone_number" value={form.phone_number} onChange={onChange}
                  placeholder="Telepon" className="border p-2 w-full rounded" required/>
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
              </div>
              <div>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  placeholder="Email" className="border p-2 w-full rounded" required/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={()=>setEditOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Batal</button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
