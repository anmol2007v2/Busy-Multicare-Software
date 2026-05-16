

const Exhibitions = () => {
  return (
    <section className="py-section-padding px-margin-desktop bg-surface" id="exhibitions">
      <div className="max-w-container-max mx-auto">
        <h2 className="text-headline-lg text-on-background mb-12 text-center">At the Forefront of Innovation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
            <img 
              alt="Large Exhibition Booth" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="/image/aa 1.svg" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-surface-bright text-headline-sm">CAN Info-Tech Major Presence</p>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
            <img 
              alt="Award Ceremony" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="/image/aa 2.svg" 
            />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img 
              alt="Team Collaboration" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="/image/ac 1.svg" 
            />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img 
              alt="Exhibition View" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="/image/ac 2.svg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
