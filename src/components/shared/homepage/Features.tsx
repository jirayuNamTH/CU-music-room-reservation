import { Bolt, CalendarDays, Search } from "lucide-react"; 

function Features() {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Discover Spaces",
      description: "Search thousands of spaces by activity, location, and amenities to find the perfect match.",
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-primary" />,
      title: "Book Instantly",
      description: "Check real-time availability and book your slot in just a few clicks. No back-and-forth.",
    },
    {
      icon: <Bolt className="h-8 w-8 text-primary" />,
      title: "Manage Easily",
      description: "View all your upcoming and past bookings in one simple, organized dashboard.",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need, right here.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The simplest way to book and manage your spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;