import React from 'react'

const TeamMembers = () => {
  const members = [
    {
      name: 'Javeria Sarwar',
      rollNumber: 'BSCS-F23-115',
      contribution: 'Frontend Development and UI/UX Design',
      image: 'https://img.pikbest.com/png-images/20241231/simple-black-and-white-female-avatar-icon_11326880.png!sw800'
    },
    {
      name: 'Syed Mujtaba Raza',
      rollNumber: 'BSCS-F23-66',
     
      contribution: 'Backend Development and Database Management',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMM-LIxomqumnU4m-kKaylG1gfC69XzkQnd6q1lbURhRQes-uFiGPE2OBniHCEE4ErsaY&usqp=CAU'
    },
    {
      name: 'Muhammad Ana',
      rollNumber: 'BSCS-F23-83',
      
      contribution: 'Project Management and Testing',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMM-LIxomqumnU4m-kKaylG1gfC69XzkQnd6q1lbURhRQes-uFiGPE2OBniHCEE4ErsaY&usqp=CAU'
    }
  ]

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-1"><strong>Roll Number:</strong> {member.rollNumber}</p>
            
              <p className="text-gray-600"><strong>Contribution:</strong> {member.contribution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamMembers
