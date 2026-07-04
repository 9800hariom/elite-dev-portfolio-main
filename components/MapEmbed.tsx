import React from 'react';

const MapEmbed = ({ location }: { location: string }) => {
  const encodedLocation = encodeURIComponent(location);
  
  return (
    <div className="w-full h-[400px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2849379844653!2d85.92688122346066!3d26.894193062127044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed587f3b18c5a5%3A0x1234567890abcdef!2s${encodedLocation}!5e0!3m2!1sen!2snp!4v1234567890123`}
      />
    </div>
  );
};

export default MapEmbed;
