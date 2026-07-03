import { Search, Filter } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm, filter, setFilter }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter */}

        <div className="relative md:w-60">
          <Filter
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white  outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Fitness">Fitness</option>
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
