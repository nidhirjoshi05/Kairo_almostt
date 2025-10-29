import EQAssessment from '../EQAssessment';

export default function EQAssessmentExample() {
  return (
    <div className="p-6 max-w-2xl">
      <EQAssessment canRetake={true} onComplete={(score) => console.log('EQ Score:', score)} />
    </div>
  );
}
