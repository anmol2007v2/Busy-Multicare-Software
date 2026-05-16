

const leaders = [
  { name: "Ashish Tamang", role: "Strategic Operations" },
  { name: "Rojina Tandukar", role: "Business Development" },
  { name: "Manish Shrestha", role: "Technical Support Head" },
  { name: "Anisha Thapa", role: "Customer Relations" }
];

const Leadership = () => {
  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-x-hidden" id="about">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                alt="Leadership Team" 
                className="w-full object-cover" 
                src="/image/owner achievement 1.svg" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full -z-10 opacity-10"></div>
          </div>
          <div className="pl-0 lg:pl-12">
            <h2 className="text-headline-lg text-on-background mb-6">Our Leadership & Vision</h2>
            <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Under the visionary leadership of our executive team, Busy Multi Care has grown to become the standard for business automation in Nepal. We combine deep local market understanding with global software expertise.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {leaders.map((leader, i) => (
                <div key={i} className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-on-background">{leader.name}</h4>
                  <p className="text-label-sm text-on-surface-variant">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
