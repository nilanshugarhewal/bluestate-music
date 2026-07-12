import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAdminBeatByIdQuery, useUpdateBeatMutation } from "../../store/apiSlice";
import { Beat } from "../../types";

const EditBeat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: fetchedBeat, isLoading: loading } = useGetAdminBeatByIdQuery(id ?? "", { skip: !id });
  const [updateBeat] = useUpdateBeatMutation();

  const [beat, setBeat] = useState<Partial<Beat> | null>(null);
  const [saving, setSaving] = useState(false);

  // Sync fetched data to local editable state
  useEffect(() => {
    if (fetchedBeat) {
      setBeat(fetchedBeat);
    }
  }, [fetchedBeat]);

  // Handle input changes (single fields)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!beat) return;
    const { name, value } = e.target;
    setBeat({ ...beat, [name]: value });
  };

  // Handle array fields (genre)
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "genre"
  ) => {
    if (!beat) return;
    setBeat({
      ...beat,
      [field]: e.target.value.split(",").map((s) => s.trim()),
    });
  };

  // Submit changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !beat) return;

    setSaving(true);

    try {
      await updateBeat({ id, updates: beat }).unwrap();
      alert("✅ Beat updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update beat");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (!beat) return <p className="text-center p-6">Beat not found!</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Beat</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          value={beat.title || ""}
          onChange={handleChange}
        />

        {/* BPM */}
        <InputField
          label="BPM"
          name="bpm"
          type="number"
          value={beat.bpm || ""}
          onChange={handleChange}
        />

        {/* Genre */}
        <InputField
          label="Genre (comma separated)"
          value={beat.genre?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "genre")}
        />


        {/* Scale */}
        <InputField
          label="Scale"
          name="scale"
          value={beat.scale || ""}
          onChange={handleChange}
        />

        {/* Duration */}
        <InputField
          label="Duration"
          name="duration"
          value={beat.duration || ""}
          onChange={handleChange}
        />


        {/* Cover Image */}
        <InputField
          label="Cover Image URL"
          name="coverImage"
          value={beat.coverImage || ""}
          onChange={handleChange}
        />

        {/* Audio URL */}
        <InputField
          label="Audio URL"
          name="audioUrl"
          value={beat.audioUrl || ""}
          onChange={handleChange}
        />

        {/* Collection Name */}
        <InputField
          label="Collection Name"
          name="beatCollection"
          value={beat.beatCollection || ""}
          onChange={handleChange}
        />

        {/* Purchase Link */}
        <InputField
          label="Purchase Link"
          name="purchaseLink"
          value={beat.purchaseLink || ""}
          onChange={handleChange}
        />

        {/* Release Date */}
        <div>
          <label className="block font-medium mb-1">Release Date</label>
          <input
            type="date"
            value={beat.releaseDate ? new Date(beat.releaseDate).toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setBeat({ ...beat, releaseDate: new Date(e.target.value).toISOString() })
            }
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? "Updating..." : "Update Beat"}
        </button>
      </form>
    </div>
  );
};

// Reusable input component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name?: string;
  value: string | number;
  onChange: (e: any) => void;
  type?: string;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
    />
  </div>
);

export default EditBeat;
