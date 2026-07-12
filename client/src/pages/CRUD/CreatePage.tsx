import React, { useState } from "react";
import { useCreateBeatMutation } from "../../store/apiSlice";
import { Beat } from "../../types";

const CreatePage = () => {
  const [newBeat, setNewBeat] = useState<Partial<Beat>>({});
  const [createBeat] = useCreateBeatMutation();

  // Create / Upload Beat
  const handleCreate = async () => {
    try {
      await createBeat(newBeat).unwrap();
      setNewBeat({});
      alert("Beat created successfully!");
    } catch (err) {
      console.error("Error creating beat:", err);
      alert("Failed to create beat.");
    }
  };

  return (
    <div>
      <div className="upload-beat">
        <div className="upload-heading">Upload Beat</div>

        <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={newBeat.title || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, title: e.target.value })
              }
            />
          </div>

          <div>
            <label>Cover Image</label>
            <input
              placeholder="Cover Image URL"
              value={newBeat.coverImage || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, coverImage: e.target.value })
              }
            />
          </div>

          <div>
            <label>Audio URL</label>
            <input
              placeholder="Audio URL"
              value={newBeat.audioUrl || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, audioUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label>BPM</label>
            <input
              type="number"
              placeholder="BPM"
              value={newBeat.bpm || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, bpm: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label>Genre (comma separated)</label>
            <input
              placeholder="Hip Hop, Trap"
              value={newBeat.genre?.join(", ") || ""}
              onChange={(e) =>
                setNewBeat({
                  ...newBeat,
                  genre: e.target.value.split(",").map((g) => g.trim()),
                })
              }
            />
          </div>


          <div>
            <label>Scale</label>
            <input
              placeholder="C Minor"
              value={newBeat.scale || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, scale: e.target.value })
              }
            />
          </div>

          <div>
            <label>Duration</label>
            <input
              placeholder="3:45"
              value={newBeat.duration || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, duration: e.target.value })
              }
            />
          </div>

          <div>
            <label>Collection Name</label>
            <input
              placeholder="Summer Vibes"
              value={newBeat.beatCollection || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, beatCollection: e.target.value })
              }
            />
          </div>

          <div>
            <label>Purchase Link</label>
            <input
              placeholder="https://beat22.com/..."
              value={newBeat.purchaseLink || ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, purchaseLink: e.target.value })
              }
            />
          </div>

          <div>
            <label>Release Date</label>
            <input
              type="date"
              value={newBeat.releaseDate ? new Date(newBeat.releaseDate).toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setNewBeat({ ...newBeat, releaseDate: new Date(e.target.value).toISOString() })
              }
            />
          </div>

          <button onClick={handleCreate}>Add Beat</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
