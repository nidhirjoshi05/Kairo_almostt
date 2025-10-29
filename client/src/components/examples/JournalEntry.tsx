import JournalEntry from '../JournalEntry';

export default function JournalEntryExample() {
  return (
    <div className="p-6 max-w-2xl">
      <JournalEntry onSave={(entry) => console.log('Journal saved:', entry)} />
    </div>
  );
}
