import { Box } from '@mui/material';
import { Contract } from '@/entities/Contract.entity';
import Token from '@/tokens';
import { IconList } from '@/components';

const getContractStatusIcons = (contract: Contract) => {
  const reviewed = contract.cadMetadata?.reviewed;
  const hasNote = !!contract.cadMetadata?.note?.trim();

  const statusIcon = reviewed
    ? Token.IconTemplate.ContractReviewed
    : Token.IconTemplate.ContractPending;

  const noteIcon = hasNote
    ? Token.IconTemplate.ContractWithNotes
    : Token.IconTemplate.ContractWithoutNotes;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconList
        name={statusIcon.name}
        description={statusIcon.description}
        color={statusIcon.color}
      />
      <IconList
        name={noteIcon.name}
        description={noteIcon.description}
        color={noteIcon.color}
      />
    </Box>
  );
};

export default getContractStatusIcons;
