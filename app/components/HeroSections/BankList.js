"use client";
export const SwitchGenPost = ({
  ChangeStat,
  StatusCallTru,
  onChange,
  label,
  AllOption,
  DataTrack,
}) => {
  const Data = StatusCallTru;
  return (
    <div className="relative">
      <label htmlFor="bank" className="label">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 overflow-hidden w-full rounded-lg pl-3 h-10">
        <select
          id="bank"
          value={ChangeStat}
          onChange={onChange}
          className="flex-1 h-9 outline-none rounded-lg text-gray-800 overflow-hidden focus:ring-0"
          required
        >
          <option value="">{AllOption}</option>
          {Data.map((bank, index) => (
            <option key={index} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
