import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAdminBeatsQuery, useDeleteBeatMutation } from "../../store/apiSlice";
import Loading from "../../components/Loading/Loading";

const AdminPanel = () => {
  const { data: beats = [], isLoading } = useGetAdminBeatsQuery();
  const [deleteBeat] = useDeleteBeatMutation();
  const [search, setSearch] = useState("");

  // Delete Beat
  const handleDelete = (id: string) => {
    deleteBeat(id);
  };

  // Filter beats by search
  const filteredBeats = beats.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <div className="admin-search">
        <p className="admin-heading">Admin Panel</p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link to="/create">
        <button>Upload New</button>
      </Link>

      {/* Beats Table */}
      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>BPM</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={4}><Loading /></td></tr>
          ) : (
            filteredBeats.map((beat) => (
            <tr key={beat.id}>
              <td>{beat.title}</td>
              <td>{beat.bpm}</td>
              <td>{beat.genre?.join(", ")}</td>
              <td>
                <button onClick={() => handleDelete(beat.id)}>Delete</button>
                <a href={`/edit/${beat.id}`}>
                  <button>Edit</button>
                </a>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
