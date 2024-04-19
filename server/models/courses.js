const sql = require('../config/db');

async function createCoursesTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS courses (
            id INT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            instructor VARCHAR(255) NOT NULL,
            duration VARCHAR(50) NOT NULL ,
            price DECIMAL(10, 2) NOT NULL,
            level VARCHAR(50) NOT NULL
        );
        `;
        console.log('Courses created successfully');
        await InsertDemoCourses();
    } catch (error) {
        console.error('Error creating Courses table:', error);
    }
}

async function InsertDemoCourses(){
    try {
        await sql`
INSERT INTO courses (id, title, description, instructor, duration, price, level) VALUES
(1, 'Introduction to Computer Science', 'An introductory course covering basic concepts of computer science such as algorithms, data structures, and programming languages.', 'Dr. John Smith', '12 weeks', 99.99, 'Beginner'),
(2, 'Web Development Fundamentals', 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.', 'Ms. Emily Johnson', '8 weeks', 79.99, 'Intermediate'),
(3, 'Data Science with Python', 'A comprehensive course covering data science techniques using Python programming language.', 'Dr. Michael Brown', '10 weeks', 129.99, 'Advanced'),
(4, 'Machine Learning Basics', 'Learn the basics of machine learning including supervised and unsupervised learning algorithms.', 'Dr. Sarah Lee', '6 weeks', 89.99, 'Intermediate'),
(5, 'Artificial Intelligence Foundations', 'An introductory course covering the foundational concepts of artificial intelligence, including machine learning, neural networks, and natural language processing.', 'Dr. Alex Wong', '14 weeks', 149.99, 'Intermediate'),
(6, 'Cybersecurity Essentials', 'Learn essential concepts and techniques in cybersecurity, including network security, cryptography, and ethical hacking.', 'Mr. David Miller', '8 weeks', 109.99, 'Intermediate'),
(7, 'iOS App Development with Swift', 'Build iOS applications using the Swift programming language. Covers UI design, networking, and data persistence.', 'Ms. Sarah Thompson', '10 weeks', 129.99, 'Intermediate'),
(8, 'Advanced Database Management', 'Advanced topics in database management, including database design, optimization, and transaction management.', 'Dr. Kevin Johnson', '12 weeks', 139.99, 'Advanced'),
(9, 'Digital Marketing Fundamentals', 'An overview of digital marketing strategies, including SEO, social media marketing, and email marketing.', 'Ms. Rachel White', '8 weeks', 99.99, 'Beginner'),
(10, 'Project Management Basics', 'Fundamental principles of project management, including planning, execution, and monitoring.', 'Mr. Michael Johnson', '6 weeks', 79.99, 'Beginner'),
(11, 'Deep Learning with TensorFlow', 'Learn how to build and train deep learning models using TensorFlow framework.', 'Dr. Emily Chen', '10 weeks', 159.99, 'Advanced'),
(12, 'Java Programming for Beginners', 'An introductory course to learn Java programming language from scratch.', 'Mr. Andrew Davis', '8 weeks', 89.99, 'Beginner'),
(13, 'UX/UI Design Fundamentals', 'Introduction to user experience (UX) and user interface (UI) design principles and methodologies.', 'Ms. Laura Wilson', '6 weeks', 99.99, 'Intermediate'),
(14, 'Ethical Hacking and Penetration Testing', 'Learn ethical hacking techniques and penetration testing methodologies to secure computer systems.', 'Mr. Christopher Brown', '12 weeks', 149.99, 'Advanced'),
(15, 'Android App Development with Kotlin', 'Build Android applications using the Kotlin programming language.', 'Mr. James Smith', '10 weeks', 129.99, 'Intermediate'),
(16, 'Cloud Computing Essentials', 'An overview of cloud computing concepts, services, and deployment models.', 'Dr. Olivia Taylor', '8 weeks', 109.99, 'Intermediate'),
(17, 'React.js Fundamentals', 'Learn the fundamentals of React.js library for building user interfaces.', 'Mr. Daniel Wilson', '6 weeks', 79.99, 'Intermediate'),
(18, 'Blockchain Basics', 'Introduction to blockchain technology, cryptocurrencies, and smart contracts.', 'Dr. Benjamin Adams', '8 weeks', 119.99, 'Intermediate'),
(19, 'Mobile App Design Principles', 'Fundamental principles of designing user-friendly mobile applications.', 'Ms. Sophia Moore', '6 weeks', 99.99, 'Intermediate'),
(20, 'Network Security Fundamentals', 'Basic concepts and principles of network security, including encryption, firewalls, and intrusion detection.', 'Mr. Ethan Johnson', '8 weeks', 109.99, 'Intermediate'),
(21, 'C# Programming for Beginners', 'An introductory course to learn C# programming language for .NET development.', 'Ms. Jennifer White', '8 weeks', 89.99, 'Beginner'),
(22, 'Full-Stack Web Development Bootcamp', 'Comprehensive bootcamp covering front-end and back-end web development technologies.', 'Mr. Ryan Garcia', '14 weeks', 199.99, 'Intermediate'),
(23, 'SQL Database Management', 'Learn SQL language for managing and querying relational databases.', 'Dr. Jessica Robinson', '6 weeks', 79.99, 'Beginner'),
(24, 'Python for Data Analysis', 'Using Python programming language for data analysis, manipulation, and visualization.', 'Mr. Jacob Brown', '10 weeks', 129.99, 'Intermediate'),
(25, 'Agile Project Management', 'An overview of agile project management methodologies and practices.', 'Ms. Amanda Johnson', '8 weeks', 99.99, 'Intermediate'),
(26, 'Game Development with Unity', 'Learn how to develop games using the Unity game engine and C# programming language.', 'Mr. Tyler Clark', '12 weeks', 149.99, 'Intermediate'),
(27, 'Cybersecurity Risk Management', 'Managing cybersecurity risks within an organization, including risk assessment and mitigation strategies.', 'Dr. William Harris', '10 weeks', 139.99, 'Advanced'),
(28, 'Data Visualization with Tableau', 'Using Tableau software for creating interactive and visually appealing data visualizations.', 'Ms. Nicole Martinez', '8 weeks', 119.99, 'Intermediate'),
(29, 'JavaScript Advanced Concepts', 'Advanced JavaScript concepts including closures, prototypes, and asynchronous programming.', 'Mr. Matthew Johnson', '6 weeks', 89.99, 'Advanced'),
(30, 'Introduction to Robotics', 'Basic concepts of robotics, including kinematics, sensors, and control systems.', 'Dr. Samantha Miller', '8 weeks', 109.99, 'Intermediate'),
(31, 'Artificial Neural Networks', 'In-depth study of artificial neural networks and their applications in machine learning.', 'Dr. George Clark', '10 weeks', 139.99, 'Advanced'),
(32, 'UI/UX Design for Mobile Applications', 'Designing intuitive and user-friendly interfaces for mobile applications.', 'Ms. Emily Wilson', '6 weeks', 99.99, 'Intermediate'),
(33, 'Advanced Data Structures', 'In-depth study of advanced data structures such as trees, graphs, and heaps.', 'Dr. Robert Johnson', '10 weeks', 129.99, 'Advanced'),
(34, 'Linux System Administration', 'Learn how to administer Linux operating systems, including installation, configuration, and maintenance.', 'Mr. Joshua Davis', '8 weeks', 109.99, 'Intermediate'),
(35, 'Ethical Hacking Techniques', 'Advanced techniques and methodologies for conducting ethical hacking and penetration testing.', 'Mr. Nathan Green', '12 weeks', 159.99, 'Advanced'),
(36, 'iOS App Design and Development', 'Designing and developing iOS applications using modern design patterns and best practices.', 'Ms. Samantha Harris', '10 weeks', 139.99, 'Intermediate'),
(37, 'Digital Marketing Analytics', 'Using analytics tools to measure and analyze the effectiveness of digital marketing campaigns.', 'Ms. Julia Thompson', '8 weeks', 119.99, 'Intermediate'),
(38, 'Java Enterprise Edition (EE)', 'Building enterprise-level Java applications using Java EE technologies such as servlets and JSP.', 'Mr. William Roberts', '12 weeks', 149.99, 'Intermediate'),
(39, 'Cloud Computing Security', 'Security considerations and best practices for deploying applications and data in cloud environments.', 'Dr. Lucas Anderson', '10 weeks', 129.99, 'Advanced'),
(40, 'React Native Mobile App Development', 'Building cross-platform mobile applications using React Native framework.', 'Mr. Jason Martinez', '8 weeks', 119.99, 'Intermediate'),
(41, 'Data Warehousing and Business Intelligence', 'Building and managing data warehouses for business intelligence and analytics purposes.', 'Dr. Kimberly Johnson', '10 weeks', 139.99, 'Advanced'),
(42, 'Advanced JavaScript Frameworks', 'In-depth study of advanced JavaScript frameworks such as Angular, Vue.js, and Ember.js.', 'Mr. Daniel Clark', '8 weeks', 109.99, 'Advanced'),
(43, 'Introduction to Embedded Systems', 'Basic concepts of embedded systems, including microcontrollers and real-time operating systems.', 'Dr. Andrew Lee', '6 weeks', 89.99, 'Intermediate'),
(44, 'Python Web Development with Django', 'Building web applications using the Django web framework and Python programming language.', 'Ms. Isabella White', '10 weeks', 129.99, 'Intermediate'),
(45, 'IT Service Management (ITSM)', 'Managing IT services according to ITIL framework and best practices.', 'Mr. Ethan Roberts', '8 weeks', 109.99, 'Intermediate'),
(46, 'Big Data Analytics', 'Introduction to big data analytics techniques and technologies for processing and analyzing large datasets.', 'Dr. Sophia Garcia', '10 weeks', 129.99, 'Intermediate'),
(47, 'Game Design and Development', 'Principles of game design and development, including game mechanics, storytelling, and prototyping.', 'Mr. Samuel Brown', '12 weeks', 149.99, 'Intermediate'),
(48, 'Introduction to Microservices Architecture', 'Basic concepts of microservices architecture, including service decomposition, communication, and deployment.', 'Dr. Christopher Taylor', '8 weeks', 99.99, 'Intermediate'),
(49, 'Front-End Web Development with React.js', 'Building interactive and responsive web applications using React.js library.', 'Ms. Olivia Clark', '10 weeks', 129.99, 'Intermediate'),
(50, 'Data Mining and Knowledge Discovery', 'Techniques for discovering patterns and knowledge from large datasets.', 'Dr. William Wilson', '8 weeks', 109.99, 'Intermediate'),
(51, 'Software Testing and Quality Assurance', 'Principles and practices of software testing and quality assurance.', 'Mr. Benjamin Martinez', '6 weeks', 89.99, 'Intermediate'),
(52, 'Embedded Systems Programming', 'Programming microcontrollers and embedded systems using C and assembly languages.', 'Dr. Joshua Brown', '8 weeks', 109.99, 'Intermediate'),
(53, 'Mobile User Interface Design', 'Designing user interfaces for mobile applications to enhance usability and user experience.', 'Ms. Sophia Clark', '6 weeks', 99.99, 'Intermediate'),
(54, 'Advanced Topics in Machine Learning', 'Advanced machine learning topics such as deep learning, reinforcement learning, and generative models.', 'Dr. Michael Miller', '10 weeks', 139.99, 'Advanced'),
(55, 'Software Architecture and Design Patterns', 'Principles of software architecture and common design patterns for building scalable and maintainable software systems.', 'Mr. Matthew Davis', '8 weeks', 119.99, 'Intermediate'),
(56, 'Internet of Things (IoT) Fundamentals', 'Introduction to IoT concepts and technologies for building connected devices and applications.', 'Dr. Emily Garcia', '10 weeks', 129.99, 'Intermediate'),
(57, 'Advanced Web Development with Node.js', 'Building scalable web applications using Node.js runtime environment and Express.js framework.', 'Mr. Daniel Brown', '12 weeks', 149.99, 'Intermediate'),
(58, 'Computer Networks and Communication', 'Fundamental concepts of computer networks and communication protocols.', 'Dr. Jacob Miller', '8 weeks', 109.99, 'Intermediate'),
(59, 'Natural Language Processing (NLP)', 'Introduction to natural language processing techniques and applications, including text classification and sentiment analysis.', 'Dr. Benjamin White', '10 weeks', 129.99, 'Intermediate'),
(60, 'Cloud Native Application Development', 'Developing and deploying cloud-native applications using containerization and microservices architecture.', 'Ms. Elizabeth Johnson', '8 weeks', 119.99, 'Intermediate'),
(61, 'Microservices Architecture Design Patterns', 'Design patterns and best practices for building microservices-based architectures.', 'Dr. Rachel Thompson', '8 weeks', 109.99, 'Advanced'),
(62, 'Vue.js Front-End Development', 'Learn Vue.js framework for building interactive and dynamic user interfaces.', 'Mr. Eric Johnson', '6 weeks', 89.99, 'Intermediate'),
(63, 'Natural Language Processing (NLP) with Python', 'Advanced natural language processing techniques using Python and libraries like NLTK and spaCy.', 'Dr. Sarah Davis', '10 weeks', 129.99, 'Advanced'),
(64, 'Advanced Algorithms and Data Structures', 'In-depth study of advanced algorithms and data structures for solving complex problems efficiently.', 'Dr. Michael Roberts', '12 weeks', 149.99, 'Advanced'),
(65, 'Cloud Security and Compliance', 'Security considerations and compliance requirements for cloud-based infrastructures and applications.', 'Ms. Amanda White', '8 weeks', 109.99, 'Advanced'),
(66, 'Java Spring Framework Essentials', 'Essential concepts and features of the Java Spring framework for building enterprise Java applications.', 'Mr. Matthew Thompson', '10 weeks', 129.99, 'Intermediate'),
(67, 'Data Science for Business Analytics', 'Applying data science techniques for business analytics and decision-making.', 'Dr. Ethan Adams', '8 weeks', 119.99, 'Intermediate'),
(68, 'Angular Front-End Web Development', 'Building modern web applications with the Angular framework.', 'Ms. Emily Davis', '8 weeks', 119.99, 'Intermediate'),
(69, 'Advanced Cryptography', 'Advanced concepts in cryptography, including encryption algorithms, digital signatures, and cryptographic protocols.', 'Dr. Benjamin Miller', '10 weeks', 139.99, 'Advanced'),
(70, 'Cloud Native Microservices Deployment', 'Deploying and managing microservices-based applications in cloud environments.', 'Mr. Daniel Garcia', '8 weeks', 109.99, 'Advanced'),
(71, 'Advanced Topics in React.js', 'In-depth exploration of advanced concepts and techniques in React.js development.', 'Dr. Olivia Moore', '10 weeks', 129.99, 'Advanced'),
(72, 'Digital Marketing Strategy and Planning', 'Developing comprehensive digital marketing strategies and creating effective marketing plans.', 'Ms. Sophia Johnson', '8 weeks', 99.99, 'Intermediate'),
(73, 'Embedded Systems Design and Development', 'Designing and developing embedded systems for various applications.', 'Mr. William Wilson', '12 weeks', 149.99, 'Advanced'),
(74, 'Python Web Scraping and Automation', 'Automating web scraping tasks and data extraction using Python.', 'Ms. Isabella Davis', '6 weeks', 89.99, 'Intermediate'),
(75, 'Advanced SQL and Database Optimization', 'Optimizing SQL queries and database performance for large-scale applications.', 'Dr. Jacob Thompson', '10 weeks', 129.99, 'Advanced'),
(76, 'Cloud DevOps and CI/CD Pipelines', 'Implementing DevOps practices and continuous integration/continuous deployment pipelines in cloud environments.', 'Mr. Samuel Wilson', '8 weeks', 119.99, 'Advanced'),
(77, 'Advanced iOS App Development', 'Advanced topics in iOS app development, including advanced UI/UX design, performance optimization, and security.', 'Ms. Emma Brown', '10 weeks', 139.99, 'Advanced'),
(78, 'Data Mining Techniques', 'Advanced techniques for data mining and knowledge discovery from large datasets.', 'Dr. Joshua Miller', '8 weeks', 109.99, 'Advanced'),
(79, 'Microcontroller Programming with Arduino', 'Programming microcontrollers using the Arduino platform for various electronic projects.', 'Mr. Nathan Thompson', '6 weeks', 79.99, 'Intermediate'),
(80, 'Advanced Topics in Cloud Computing', 'Exploration of advanced topics in cloud computing such as serverless architecture, multi-cloud environments, and cloud-native development.', 'Dr. Amelia Garcia', '10 weeks', 129.99, 'Advanced'),
(81, 'Distributed Systems and Scalability', 'Designing and building scalable distributed systems for handling large-scale applications.', 'Dr. Ethan Clark', '12 weeks', 149.99, 'Advanced'),
(82, 'Advanced Front-End Web Development', 'Advanced concepts and techniques for front-end web development, including performance optimization and accessibility.', 'Ms. Abigail Miller', '8 weeks', 119.99, 'Advanced'),
(83, 'Software Product Management', 'Strategies and techniques for managing software products throughout their lifecycle, from ideation to retirement.', 'Ms. Grace Thompson', '10 weeks', 139.99, 'Advanced'),
(84, 'Game AI Programming', 'Implementing artificial intelligence algorithms for creating intelligent behaviors in game characters.', 'Dr. Lucas Brown', '8 weeks', 109.99, 'Advanced'),
(85, 'Advanced Topics in Cybersecurity', 'Exploration of advanced topics in cybersecurity such as threat intelligence, digital forensics, and security auditing.', 'Dr. Sophia White', '10 weeks', 129.99, 'Advanced'),
(86, 'Advanced Topics in Web Scraping', 'Advanced techniques for web scraping and data extraction from complex websites and APIs.', 'Mr. Jackson Thompson', '6 weeks', 89.99, 'Advanced'),
(87, 'Network Programming with Python', 'Writing networked applications and protocols using Python programming language.', 'Mr. Daniel Brown', '8 weeks', 109.99, 'Intermediate'),
(88, 'Advanced Data Analytics', 'Advanced techniques and tools for analyzing and interpreting complex datasets.', 'Dr. Olivia Taylor', '10 weeks', 139.99, 'Advanced'),
(89, 'Digital Forensics and Incident Response', 'Investigating cybercrimes and security incidents using digital forensics techniques.', 'Mr. Matthew Roberts', '12 weeks', 159.99, 'Advanced'),
(90, 'Advanced Topics in Machine Vision', 'In-depth study of advanced techniques in computer vision and image processing.', 'Dr. Emily Clark', '10 weeks', 139.99, 'Advanced'),
(91, 'Advanced Android App Development', 'Advanced topics in Android app development, including material design, performance optimization, and security best practices.', 'Mr. Benjamin Thompson', '10 weeks', 139.99, 'Advanced'),
(92, 'Advanced Topics in Software Testing', 'In-depth exploration of advanced software testing techniques, including test automation and performance testing.', 'Ms. Emma Johnson', '8 weeks', 119.99, 'Advanced'),
(93, 'Blockchain Application Development', 'Developing decentralized applications (DApps) using blockchain platforms such as Ethereum.', 'Dr. Samuel Miller', '12 weeks', 159.99, 'Advanced'),
(94, 'Advanced Topics in Cloud Security', 'Advanced concepts and strategies for ensuring security in cloud-based environments.', 'Dr. Isabella Davis', '10 weeks', 139.99, 'Advanced'),
(95, 'Advanced Topics in Natural Language Processing', 'In-depth study of advanced techniques in natural language processing, including neural network models and sequence-to-sequence learning.', 'Dr. Jacob Wilson', '10 weeks', 139.99, 'Advanced'),
(96, 'Advanced Mobile App Security', 'Advanced techniques and best practices for securing mobile applications against various threats and vulnerabilities.', 'Mr. Lucas Johnson', '8 weeks', 119.99, 'Advanced'),
(97, 'Advanced Topics in Data Visualization', 'Exploration of advanced data visualization techniques and tools for communicating complex data.', 'Dr. Olivia Brown', '10 weeks', 139.99, 'Advanced'),
(98, 'Advanced Topics in DevOps', 'In-depth study of advanced DevOps practices and tools for streamlining software delivery and operations.', 'Mr. Joshua Thompson', '8 weeks', 119.99, 'Advanced'),
(99, 'Advanced Robotics and Automation', 'Advanced topics in robotics and automation, including robot perception, motion planning, and control.', 'Dr. Amelia Wilson', '12 weeks', 159.99, 'Advanced'),
(100, 'Advanced Topics in Cloud Computing Security', 'Exploration of advanced security techniques and best practices for securing cloud-based infrastructures and applications.', 'Dr. Benjamin Thompson', '10 weeks', 139.99, 'Advanced');
`;
        console.log('Demo Courses inserted successfully');
    }
    catch(error){
        console.error('Error inserting demo courses:', error);
    }
}

module.exports = { createCoursesTable };
