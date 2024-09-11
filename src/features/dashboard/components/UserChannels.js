import TitleCard from "../../../components/Cards/TitleCard";

function UserChannels({ data, names }) {
  return (
    <TitleCard topMargin="mt-0" key={names}>
      {/** Table Data */}
      <div className="overflow-x-hidden">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="normal-case">Assistant Name</th>
              <th className="normal-case">Call Count</th>
              <th className="normal-case">Avg Duration</th>
            </tr>
          </thead>
          <tbody>
            {names && names.length > 0 ? (
              names.map((u, k) => {
                return (
                  <tr key={k}>
                    <td>{u.name ? u.name : "Unknown"}</td>
                    {/* <td>{u.assistantId}</td> */}
                    <td>{u.count}</td>
                    <td>
                      {u.avgDuration.substring(0, 4)}
                      {/* {parseInt(u.avgDuration)} */}
                      <span className="opacity-50"> min</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No Call aggregated by assistants.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
