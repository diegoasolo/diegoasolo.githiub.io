// ====== Projects Data ======
// This file contains all project information
// Each project can have multiple images and videos that will cycle in a carousel
//
// HOW TO ADD A NEW PROJECT:
// 1. Copy one of the existing project objects below
// 2. Update the following fields:
//    - id: unique identifier (lowercase, no spaces, e.g., 'my-project')
//    - title: project title
//    - tags: array of technology/topic tags
//    - shortDescription: brief description for project cards
//    - media: array of images/videos (see examples below)
//    - thumbnail: main image for project card (usually first image)
//    - description: detailed HTML description with your work/contributions
// 3. Add images/videos to the media array:
//    - For images: { type: 'image', url: './Images/image.jpg', alt: 'Description' }
//    - For videos: { type: 'video', url: './Images/video.mp4', alt: 'Description', thumbnail: './Images/thumbnail.jpg' }
//    - NOTE: Use relative paths starting with './Images/' for files in the Images folder
//    - NOTE: PDFs cannot be displayed in the carousel - convert to JPG/PNG images first
// 4. Fill in the "What I Did" section in the description with your specific contributions
//
// TIP: You can add as many images/videos as you want - they will cycle automatically in a carousel
// TIP: To use local images, place them in the Images/ folder and use: './Images/your-image.jpg'

const PROJECTS = [
  {
    id: 'foghacks',
    title: 'FogHacks — Adaptive Imaging Through Fog',
    tags: ['Computational Optics', 'Neural Networks', 'Image Correction'],
    shortDescription: 'Using SLM hardware and computational optics to correct images through scattering media.',
    // Multiple images/videos that will cycle in carousel
    // Use relative paths: './Images/filename.jpg' or './Images/filename.png'
    // NOTE: PDFs don't work - convert to JPG/PNG images first, or add image files to Images folder
    media: [
      {
        type: 'image',
        url: './Images/foghacks.jpg', // Replace with your actual image file
        alt: 'FogHacks Render'
      },
      // Add more images by uncommenting and updating these:
      {
        type: 'image',
        url: './Images/foghacks_imageplane.png',
        alt: 'FogHacks Scattering and unscattering'
      },
      {
        type: 'image',
        url: './Images/foghacks_SLM_to_DMD.png',
        alt: 'FogHacks SLM to DMD Conversion using Lee Hologram Technique'
      }
      // For videos:
      // {
      //   type: 'video',
      //   url: './Images/foghacks-video.mp4',
      //   alt: 'Project video',
      //   thumbnail: './Images/foghacks-thumbnail.jpg' // Optional thumbnail
      // }
    ],
    // Thumbnail for project cards (first image or specific thumbnail)
    thumbnail: './Images/foghacks.jpg', // Replace with your actual image file
    // Description section - you can add your detailed description here
    description: `
    <h3>Overview</h3>
    <p>Turbid media such as fog results in constnalty changeing scattering patterns that will disort images. We use a Digital Micromirror Device (DMD) 
    to correct for these effects by modulating the phase of the light passing through the scattering media. By training a neural network in combination with an image quality score assesment
    our system will update the DMD pattern to undo the wavefront distortion caused by the scattering media. This is an ongoing group project as of my senior design project advised by Dr. Fei Xia.</p>
    
    <h3>What I Did</h3>
    <p>Simultated ray propigation and complex random fog scattering patterns to train the neural network. Impletnented an algorithm to convert a target image to SLM Computer Generated Hologram (CGH), and then to a DMD pattern using the Lee Hologram Technique.
    Deisgined and built the optical setup to test the system including a 4f system to image the DMD pattern, a camera to capture the image, and cohnerent light source.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Computational Optics</li>
      <li>Neural Networks</li>
      <li>Image Correction</li>
      <li>Optical Design</li>
      <li>SLM Hardware</li>
    </ul>
    
    <h3>Results</h3>
    <p><i>Check back soon for results!</i></p>`
  },
  {
    id: 'hbn-quantum',
    title: 'Quantum Emitter Enhancement in hexagonal Boron Nitride',
    tags: ['Nanophotonics', 'Material Science', 'FDTD', 'Plasmonics'],
    shortDescription: 'Enhanceing photoluminescence of defect centers in hexagonal boron nitride (hBN) using plasmonic nanostructures.',
    media: [
      {
        type: 'image',
        url: './Images/QUROP_POSTER_FINAL.jpg',
        alt: 'PL spectroscopy set up'
      },
      {
        type: 'image',
        url: './Images/pl.jpg',
        alt: 'PL spectroscopy set up'
      },
      {
        type: 'image',
        url: './Images/pl_data.png',
        alt: 'hBN Quantum Emitters project image 2'
      },
      {
        type: 'image',
        url: './Images/gnr_data.png',
        alt: 'hBN Quantum Emitters project image 2'
      }
    ],
    thumbnail: './Images/pl.jpg',
    description: `
    <h3>Overview</h3>
    <p>
    Hexagonal boron nitride (hBN) is a promising material for quantum technolgies due to its unique properties. However, its low photoluminescence efficiency 
    hinders its potential. I study how we can use plasmonic nanostructures such as gold nanorods or gold cavitiesto enhance the photoluminescence of defect centers in hBN. 
    Currently I am working on this an an independent honors thesis project advised by Dr. Maxim Shcherbakov.
    <br> <br>
    The Poster (Image 1) from the 2025 UROP symposium presentation can be viewed <a href="./Images/QUROP_POSTER_FINAL.png" style="text-decoration: underline;" target="_blank" rel="noopener">here</a>!
    </p>
    
    <h3>What I Did</h3>
    <p>Simulated the enchancent from both gold coated meta cavities and gold nanorods (GNR) strucutres with hBN using FDTD simulations. Optimized device paramters such as GNR length and alumina spacer thickness to maximize the Purcell enhancement factor.
    Deigned and built the optical setup for Photoluminescence (PL)spectroscopy to measure the photoluminescence of the hBN defect centers.
    </p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Nanophotonics</li>
      <li>hexagonal Boron Nitride (hBN)</li>
      <li>FDTD Simulations</li>
      <li>Quantum Emitters</li>
      <li>Photoluminescence spectroscopy</li>
      <li>Optical Design</li>
    </ul>
    
    <h3>Results</h3>
    <p>Gold meta cavities showed a 10x increase in photoluminescence efficiency while also resulting in significantly higher Q factors (see Image 1). 
    I am currently working towards obtaining data from GNR enhancement, however I have successfully built andtested the optical setup, which can measure defect emission from hBN (see Image 2).
    I have also simulated the enhancement and polairzation from GNRs in FDTD simulations (see Image 3).
    <br> <br>
    I have recieved funding as a Quantum UROP fellow by the Eddleman Quantum Institute at UCI. click <a href="https://eqi.uci.edu/2024/09/10/the-eddleman-quantum-institute-eqi-has-awarded-9-graduate-research-fellowships-grf-for-2024-2025/" style="text-decoration: underline;" target="_blank" rel="noopener">here</a> to learn more!
    </p>`
  },


  {
    id: 'rushbot',
    title: 'RushBot — Autonomous Recruitment Rover',
    tags: ['Robotics', 'SLAM', 'Embedded Systems', 'Power Electronics'],
    shortDescription: 'Interactive rover with SLAM navigation, manipulator arm, and on-device voice/chat interface for event engagement.',
    media: [
      {
        type: 'image',
        url: './Images/rushbot_render.png',
        alt: 'RushBot CAD Render'
      },
      {
        type: 'image',
        url: './Images/rushbot_slam.png',
        alt: 'RushBot Electrical Schematic'
      },
      {
        type: 'image',
        url: './Images/rushbot_battery.png',
        alt: 'RushBot High Voltage Battery with integrated BMS'
      },
      {
        type: 'image',
        url: './Images/rushbot_present.png',
        alt: 'RushBot Presentaion at a conference'
      }
    ],
    thumbnail: './Images/rushbot_render.png',
    description: `
    <h3>Overview</h3>
    <p>RushBot is a autonomous rover for our engineering organization that is designed to navigate through a campus environment and interact with students. 
    It is equipped with a SLAM navigationsystem using a ROS2 framework, a manipulator arm tha can hand out flyers to students, 
    and a on-device voice/chat interface designed to listen and repsond to questions about the organization. 
    This team was made up of 17 students acorss differnet engineering disciplines in 3 primary subteams: hardware, software, and mechanical.
    <br> <br>
    Our full design report can be viewed <a href="rushbot_report.pdf" style="text-decoration: underline;" target="_blank" rel="noopener">here</a>!
    </p>
    
    <h3>What I Did</h3>
    <p> As project manager for the RushBot team, I was responsible for managing the progress of each subteam and their deliverables, ensuring the project 
    was on track to meet deadlines. I led both weekly subteam meetings and general team meetings to faciliate communication and cross team integration.
    I was also in charge of securing funds for the project through reaching out to the school and organizations for sponsorships.
    I also acted as primary hardware lead, leading the design of the low and high voltage systems, and designing the rover's custom 16V battery
    </p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Robotics</li>
      <li>SLAM (Simultaneous Localization and Mapping)</li>
      <li>Embedded Systems</li>
      <li>Power Electronics</li>
      <li>Battery design</li>
    </ul>
    
    <h3>Results</h3>
    <p>While we werent able to fully intergrate all aspects of the rover together, indivual aspects such as the manipulator arm, chat bot, and high voltage system were fully completed, tested,
    and demoned at the organizations regional confrence competiton (see Image 3), placing us at 1st place out of 6 teams. 
    <br> <br>
    Click here  <a href="https://www.linkedin.com/posts/ucithetatau_we-won-on-march-1st-the-pi-delta-activity-7312927741702467584-MC0Z?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADYiQEYBNCqqA2ofZpkoUAEDUo2FMq19KVg" style="text-decoration: underline;" target="_blank" rel="noopener">here</a>
    to see the LinkedIn post!
    <br> <br>
    </p>`
  },


  {
    id: 'mag-lev-device',
    title: 'Electrodynamic Suspension (EDS) Mag-Lev System',
    tags: ['Magnetic Levitation', 'COMSOL', 'Electrodynamics', 'Mechanical Design'],
    shortDescription: 'A stable magnetic levitation system using neodymium magnets in a halbach array with levitaion forces generated by rotaional motion.',
    media: [
      {
        type: 'image',
        url: './Images/maglev.jpg',
        alt: 'Magnetic levitation system'
      },
      {
        type: 'video',
        url: './Images/maglev_video.mp4',
        alt: 'Magnetic levitation system setup'
      },
      {
        type: 'image',
        url: './Images/maglev_sim.gif',
        alt: 'Magnetic levitation system simulation'
      },
      {
        type: 'image',
        url: './Images/maglev_data.png',
        alt: 'Magnetic levitation system data'
      },
      {
        type: 'image',
        url: './Images/maglev_presentation.JPG',
        alt: 'Presentation at a conference'
      }
    ],
    thumbnail: './Images/maglev.jpg',
    description: `
    <h3>Overview</h3>
    <p>
    Magnetic levitation is a desirable feature for high-speed transportation systems due to its ability to reduce drag and increase efficiency.
    We developed an Electrodynamic suspension (EDS) system using neodymium magnets in a halbach array with levitaion forces generated by rotaional motion using Lenz's law.
    Using a series of circular halbach arrays powered by high torqie DC motors, we are able to generate a levitaion force that is able to levitate the system at various speeds.
    This was designed by a team of 3 people as part Hyperxite; a senoir design project focusced on creating a high-speed energy efficient transportation pod.
    <br> <br>
    Click <a href="https://engineering.uci.edu/news/2025/8/uci-s-hyperxite-wins-three-awards-hyperloop-global-conference" style="text-decoration: underline;" target="_blank" rel="noopener">here</a> to see the our success at the Hyperloop Global Competition featured in a UCI engineering newsletter!
    </p>
    
    <h3>What I Did</h3>
    <p>I pioneered the formation of a magnetic levitation sub-team and initiated development of an Electrodynamic suspension (EDS) system. 
    I conducted comprehensive COMSOL Multiphysics simulations to evaluate and optimize permanent magnet configurations, analyzing lift and drag forces to maximize the lift-to-drag ratio. 
    Designed and built an experimental test rig and scaled prototype to validate simulations with Tof sensors.  
    This system will eventually be used in the HyperXite high-speed transportation pod.
    </p>  
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>COMSOL Multiphysics (Finite Element Analysis)</li>
      <li>Electromagnetics</li>
      <li>Experimental Test Rig Design</li>
      <li>Pyhton scripting</li>
      <li>Mechanical Design</li>
    </ul>
    
    <h3>Results</h3>
    <p>Achieved a 50% increase in lift-to-drag ratio through optimized magnet configurations. Successfully demonstrated magnetic levitation with a maximum height of 25 mm and a lift force of 100N per array.
    I presented and demoed our results at the Hyperloop Global Competition in Canada, obtaining the best leviation system award out of 8 teams (see Image 3).
    </p>`
  },


  {
    id: 'control-pcb-board',
    title: '4-Layer Control Board PCB Design',
    tags: ['PCB Design', 'Altium', 'LTspice', 'Hardware Integration'],
    shortDescription: 'A 4-layer control board PCB interfacing multiple sensors and systems, with comprehensive circuit simulation and power system integration.',
    media: [
      {
        type: 'image',
        url: './Images/control_board_schematic.png',
        alt: 'PCB design and layout'
      },
      {
        type: 'image',
        url: './Images/control_board.png',
        alt: 'Circuit board assembly'
      }
    ],
    thumbnail: './Images/control_board_cover.png',
    description: `
    <h3>Overview</h3>
    <p>
    A control board is a crucial component of Hyperxite's transportation pod.
    This control board is responsible for interfacing with the onboard Raspberry Pi to control the pod's systems such as the braking system, temperature sensors to monitor the Linear induction motor temperature, accelerometer to monitor the pod's acceleration, and pressure sensors to monitor the breaking pressure.
    </p>
    
    <h3>What I Did</h3>
    <p>Designed and developed the 4-layer control board PCB using Altium that interfaces; 8 thermistor temperature sesnors, current sensors, accerlerometer, and pressure sensors, 
    to an onboard Raspberry Pi. LT spice simulations were used to verify the proper opperation of the temperature sensors. I picked compoenents, designed the layout, and created the schematic. 
    </p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Altium Designer (PCB Layout)</li>
      <li>LTspice (Circuit Simulation)</li>
      <li>4-Layer PCB Design</li>
      <li>Compoenent selection and integration</li>
      <li>Signal Integrity Analysis</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully designed and integrated a complete control system meeting all specifications for signal integrity, power distribution, and operational stability. The board interfaces multiple sensor types and control systems seamlessly with the onboard Raspberry Pi.</p>`
  },


  {
    id: 'quantum-error-correction',
    title: 'Quantum Error Correction Codes',
    tags: ['Quantum Computing', 'Qiskit', 'Error Correction'],
    shortDescription: 'Developed and implemented 9-qubit and 13-qubit Shor error-correcting codes on IBM Quantum hardware for multi-error detection and correction.',
    media: [
      {
        type: 'image',
        url: './Images/error_correction.png',
        alt: 'Quantum computing visualization'
      },
      {
        type: 'image',
        url: './Images/error_correction_result.png',
        alt: 'Quantum circuit diagram'
      }
    ],
    thumbnail: './Images/error_correction.png',
    description: `
    <h3>Overview</h3>
    <p> Quantum error correction is a crucial technique for ensuring the reliability of quantum computers. It allows for the detection and correction of errors that occur during quantum computation.
    This project was a group project for a graudate class in Quantum Computing at UCI. We implemented a quantum error correction code using Qiskit on IBM Quantum hardware.
    We were able to successfully design and implement a 9-qubit Shor error-correcting code using Qiskit on IBM Quantum hardware, and extend it to a multi-error implementation using 13 qubits.
    </p>
    
    <h3>What I Did</h3>
    <p>Developed and implemented the 9-qubit Shor error-correcting code using Qiskit on IBM Quantum hardware, designing and optimizing quantum circuits to encode, decode, and correct arbitrary single-qubit errors. 
    Extended the 9-qubit Shor error correction to a multi-error implementation using 13 qubits in Qiskit, enabling sequential detection and correction of bit-flip (X) and phase-flip (Z) errors within a single circuit.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Qiskit (Quantum Computing Framework)</li>
      <li>Quantum computing</li>
      <li>Shor Error Correction Code</li>
      <li>Quantum Circuit Design</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully implemented both 9-qubit and 13-qubit Shor error correction codes, showing successful error correction of arbitrary single-qubit errors.
    We presented our results as part of our final for the class, recieivng a 100% on the project.
    </p>`
  },
  {
    id: 'esp',
    title: 'Emotional Support Pet (ESP)',
    tags: ['ESP32', 'Computer Vision', 'Embedded Systems'],
    shortDescription: 'A fun robotic pet lamp capabale of different emotions and interactions with the user based on their prefrence.',
    media: [
      {
        type: 'image',
        url: './Images/esp_color.jpg',
        alt: 'ESP showing different emotions'
      },
      {
        type: 'image',
        url: './Images/esp_tracking.jpg',
        alt: 'ESP Tracking System'
      },
      {
        type: 'video',
        url: './Images/esp_video.mp4',
        alt: 'ESP Video'
      },
      {
        type: 'image',
        url: './Images/esp_team.JPG',
        alt: 'ESP Team'
      }
    ],
    thumbnail: './Images/esp_color.jpg',
    description: `
    <h3>Overview</h3>
    <p> ESP or Emotional Support Pet is a fun robotic pet lamp capabale of different emotions through different LED colors and motion patterns 
    and interactions with the user based on the lamps selected mood. This was a team project as part of IEEE's first annual emmbeded systems hackathon, thus this 
    project was compelted over the course of 48 hours. It features 4 unique moods: happy, sad, angry, and lazy, and has a camera for motion tracking to interact with the user.
    </p>
    
    <h3>What I Did</h3>
    <p> I was responsible for intergration the remote LED lamp control via python using an API, as well as creating the diferent moods and motion and LEDpatterns for the lamp.
    I also assisted with other sensor intergration such as the load cell sensor to repsond to the user's touch and servo motor to move the lamp's head.
    </p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Python</li>
      <li>API Integration</li>
      <li>LED Control</li>
      <li>Embedded Systems</li>
      <li>Computer Vision</li>
    </ul>
    
    <h3>Results</h3>
    <p>After 48 hours our team succesfully demoed the ESP to the judges and attendees and completed all major aspects of the projects. 
    </p>`
  },

  {
    id: 'guidance-glasses',
    title: 'Guidance Glasses',
    tags: ['Embedded Systems', 'Machine Learning', 'Arduino', 'Computer Vision'],
    shortDescription: 'A pair of glasses that can assist the visually impaired to navigate urban enviroments by providing information about their surroundings via haptic feedback.',
    media: [
      {
        type: 'image',
        url: './Images/guidanceglasses.png',
        alt: 'Solidworks model of Guidance Glasses'
      },
      {
        type: 'image',
        url: './Images/guidanceglasses_electrical.png',
        alt: 'Electrical schematic of Guidance Glasses'
      }
    ],
    thumbnail: './Images/guidanceglasses.png',
    description: `
    <h3>Overview</h3>
    <p>Current navigation systems for the visually impaired are either costly or unreliable. I worked in a team of 6 students to design and build a pair of glasses that can assist the visually impaired to navigate urban enviroments by providing information about their surroundings via haptic feedback.
    The glasses feature an ultrasonic sensor to detect obstacles and how far away they are, as well as a camera to detect pedestrian stops and crosswalks.
    The information captured by these sensors is this converted into haptic feedback intensity located on the temples of the glasses.
    </p>
    
    <h3>What I Did</h3>
    <p>I was responsible for the electrical design of the glasses, including the ultrasonic sensor to detect obstacles and the haptic feedback system 
    which converetd object distances into haptic feedback intensity. I also helped with the CAD design of the glasses which housed the ultrasonic sensor, camera and the haptic feedback system.
    </p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Embedded Systems</li>
      <li>Computer Vision</li>
      <li>Haptic Feedback</li>
      <li>Machine Learning</li>
    </ul>
    
    <h3>Results</h3>
    <p>I succesfully designed the glasses component housing and implemented a working system that reliably converts object distances into haptic feedback intensity.</p>`
  }
];

