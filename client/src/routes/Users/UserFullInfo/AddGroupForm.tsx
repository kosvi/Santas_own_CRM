import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useGroups from '../../../hooks/useGroups';
import { groupsSelector } from '../../../store';
import { parseNumber } from '../../../utils/validators';

type Props = { setGroup: React.Dispatch<React.SetStateAction<{id: number, name: string}>> };

export const AddGroupForm = ({ setGroup }: Props  ) => {

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { fetchAllGroups } = useGroups();
  const { groups } = useSelector(groupsSelector);

  const handleLoadGroups = () => {
    setButtonDisabled(true);
    fetchAllGroups();
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseNumber(event.currentTarget.value);
    if(id && !isNaN(id)) {
      const group = groups.find(g => g.id===id);
      if(group) {
        setGroup({ id: id, name: group.name });
      }
    } else {
      setGroup({ id: 0, name: '' });
    }
  };

  return (
    <div>
      <button onClick={handleLoadGroups} disabled={buttonDisabled}>load groups</button><br />
      <select onChange={handleGroupChange}>
        <option>choose group</option>
        {groups.map(g => {
          return <option key={g.id} value={g.id} label={g.name} />;
        })}</select>
    </div>
  );
};
