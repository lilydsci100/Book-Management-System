

import React from 'react';
import {Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;




const Home = () => {
return(
<>
<Typography>
    <Title>Introduction</Title>

    <Paragraph>

Welcome to the Book Management System, an application designed to streamline the management of your book collection using the powerful capabilities of React.js and Ant Design (AntD). This system offers a sleek, intuitive interface for managing book inventories, tracking details, and organizing collections efficiently.
    </Paragraph>


    <Title level={2}>Key Features:</Title>

    <Paragraph>
    - User-Friendly Interface:** Utilizing Ant Design for a clean and responsive design.
    <br></br>
    - Comprehensive Book Management:** Add, edit, and delete book entries with ease.
    <br></br>
    - Search and Filter: Quickly find books using advanced search and filter options.
    <br></br>
    - Responsive Design: Optimized for use on both desktop and mobile devices.
    </Paragraph>

    <Title level={2}>Technology Stack:</Title>
    <Paragraph>
    - React.js: A robust front-end library for building user interfaces.
    <br></br>
    - Ant Design (AntD): A popular React UI framework that provides a collection of high-quality components.
    </Paragraph>
    
    <Paragraph>
      This book management system simplifies the task of cataloging and managing books, making it a valuable tool for libraries, bookstores, and personal collections. Enjoy a seamless experience managing your books with this modern application.
    </Paragraph>
    </Typography>
</>
);
};
export default Home