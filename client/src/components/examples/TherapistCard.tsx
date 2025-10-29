import TherapistCard from '../TherapistCard';

export default function TherapistCardExample() {
  //todo: remove mock functionality
  const therapists = [
    {
      name: "Dr. Sarah Patel",
      specialization: "Anxiety & Depression",
      bio: "Specializing in cognitive behavioral therapy with over 10 years of experience helping clients manage anxiety and depression.",
      availability: "Mon-Fri, 2-6 PM IST",
      canSchedule: true,
    },
    {
      name: "Dr. Amit Kumar",
      specialization: "Trauma & PTSD",
      bio: "Expert in trauma-focused therapy and EMDR. Compassionate approach to healing from traumatic experiences.",
      availability: "Tue-Sat, 10 AM-4 PM IST",
      canSchedule: false,
    }
  ];

  return (
    <div className="p-6 max-w-2xl space-y-4">
      {therapists.map((therapist, index) => (
        <TherapistCard
          key={index}
          {...therapist}
          onSchedule={() => console.log('Schedule with:', therapist.name)}
        />
      ))}
    </div>
  );
}
