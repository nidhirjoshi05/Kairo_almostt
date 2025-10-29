import HealingCircle from '../HealingCircle';

export default function HealingCircleExample() {
  //todo: remove mock functionality
  const circles = [
    {
      name: "Anxiety Support Group",
      description: "A supportive space to share experiences and coping strategies for anxiety.",
      schedule: "Tuesdays, 7:00 PM IST",
      participants: 6,
      maxParticipants: 10,
    },
    {
      name: "Mindfulness & Meditation",
      description: "Learn and practice mindfulness techniques together.",
      schedule: "Fridays, 6:30 PM IST",
      participants: 8,
      maxParticipants: 12,
      isJoined: true,
    }
  ];

  return (
    <div className="p-6 max-w-2xl space-y-4">
      {circles.map((circle, index) => (
        <HealingCircle
          key={index}
          {...circle}
          onJoin={() => console.log('Joined:', circle.name)}
        />
      ))}
    </div>
  );
}
