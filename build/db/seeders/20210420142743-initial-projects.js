'use strict';

var config = require('../../config');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
     */
    return queryInterface.bulkInsert('Projects', [{
      img: '/assets/products/img1.jpg',
      title: 'NESO Library',
      subtitle: 'Fulton County Libraries - Northeast Spruil Oaks Library',
      projectType: 'commissioning',
      industry: 'education',
      client: 'Fulton County',
      location: 'Johns Creek, Georgia',
      buildingType: 'library',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 25000000,
      cxCost: 25000,
      status: 'Warranty Phase',
      isActive: true,
      subscription: "standard",
      subscriptionEnd: new Date(),
      notes: 'Existing project being added to the database',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: '/assets/products/img2.jpg',
      title: 'OCEE Library',
      subtitle: 'Fulton County Libraries - Dr. Robert Fulton Library at Spruil Oaks',
      projectType: 'commissioning',
      industry: 'education',
      client: 'Fulton County',
      location: 'Johns Creek, Georgia',
      buildingType: 'library',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'Warranty Phase',
      isActive: true,
      subscription: "standard",
      subscriptionEnd: new Date(),
      notes: 'Existing project being added to the database',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: '1-2.png',
      title: 'Sugar Hill Epicenter',
      subtitle: 'City of Sugar Hill - Epicenter',
      projectType: 'New Commissioning',
      industry: 'local government',
      client: 'City of Sugar Hill',
      location: 'Sugar Hill, GA',
      buildingType: 'Multipurpose',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'closed',
      isActive: false,
      subscription: "",
      subscriptionEnd: new Date(),
      notes: 'Sugar Hill is bringing a mix of both commercial and residential properties to our downtown. This development will take place in a series of planned phases. The E Center will consist of a sports gym and a community theater wrapped with commercial space for restaurants, retail and offices; all to be managed by the City’s Downtown Development Authority. The new E Center will be located on West Broad Street, adjacent to Sugar Hill City Hall.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'med--SBS-Logo.jpg',
      title: 'Civil Rights Institute',
      subtitle: 'Trane Energy Upgrades - Birmingham Civil Rights Institute',
      projectType: 'Retro-Commissioning',
      industry: 'local government',
      client: 'City of Birmingham',
      location: 'Birmingham Alabama',
      buildingType: 'Museum',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'closed',
      isActive: false,
      subscription: "",
      subscriptionEnd: new Date(),
      notes: 'This is part of a 5 project contract with Trane.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'rendering-1.png',
      title: 'Birmingham City Hall',
      subtitle: 'Trane Energy Upgrades - Birmingham City Hall',
      projectType: 'Retro-Commissioning',
      industry: 'local government',
      client: 'City of Birmingham',
      location: 'Birmingham Alabama',
      buildingType: 'Government Offices',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'closed',
      isActive: false,
      subscription: "",
      subscriptionEnd: new Date(),
      notes: 'This building is part of a 5 project contract with Smart Buildings, Trane, and the City of Birmingham.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'med--SBS-Logo.jpg',
      title: 'Birmingham Central Library',
      subtitle: 'Trane Energy Upgrades - Birmingham Public Library - Central Library',
      projectType: 'Retro-Commissioning',
      industry: 'local government',
      client: 'City of Birmingham',
      location: 'Birmingham Alabama',
      buildingType: 'Library',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'closed',
      isActive: false,
      subscription: "",
      subscriptionEnd: new Date(),
      notes: 'This building is part of a 5-project contract with Smart Buildings, Trane, and The City of Birmingham.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'med--SBS-Logo.jpg',
      title: 'Birmingham Police Department',
      subtitle: 'Trane Energy Upgrades - Birmingham Police Department Headquarters',
      projectType: 'Retro-Commissioning',
      industry: 'local government',
      client: 'City of Birmingham',
      location: 'Birmingham Alabama',
      buildingType: 'Police Precinct',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'closed',
      isActive: false,
      subscription: "",
      subscriptionEnd: new Date(),
      notes: 'This facility is included in a 5-project contract with Smart Building Systems, TRANE, and the City of Birmingham.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: '14217-Gymnasium_Rendering_1.png',
      title: 'High Quality Cx',
      subtitle: 'Test Project - High Quality Cx',
      projectType: 'New Commissioning',
      industry: 'federal',
      client: 'EMCx',
      location: 'Buford, GA',
      buildingType: 'Office Building',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'construction',
      isActive: true,
      subscription: "basic",
      subscriptionEnd: new Date(),
      notes: 'This is a test project. It will be used to evaluate the functionality of the application. It will also be used in app demonstration.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'rendering-1.png',
      title: 'COA Zone 3 Police Precinct',
      subtitle: 'City of Atlanta Police Precinct - Zone 3',
      projectType: 'New Commissioning',
      industry: 'local government',
      client: 'City of Atlanta',
      location: 'Atlanta, GA',
      buildingType: 'Police Precinct',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'warranty',
      isActive: true,
      subscription: "basic",
      subscriptionEnd: new Date(),
      notes: 'The precinct will house offices, interview rooms, holding areas, morning/day/evening watch area and a community roll/ call room. the police precinct is a 2-story building constructed of masonry, curtain wall system, storefront system and metal panels. there will be both public and private parking.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: 'LibrariesThumbnail.png',
      title: 'Fulton County - Group 2 Libraries',
      subtitle: 'Group 2 Libraries',
      projectType: 'New Commissioning',
      industry: 'local government',
      client: 'Fulton County',
      location: 'Atlanta, GA',
      buildingType: 'Library',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'warranty',
      isActive: true,
      subscription: "pro",
      subscriptionEnd: new Date(),
      notes: 'Libraries in this scope are:\nBuckhead Library,\nNorthside Library,\nNorth East Spruill Oaks Library (NESO),\nRobert Fulton Regional Library (OCEE).\n\nLibraries will be pursuing LEED Silver with the USGBC and with Fundamental Commissioning pre-requisite. Systems to be commissioned are:\n1. HVAC\n2. HVAC Controls\n3. Domestic Water\n4. Lighting Controls',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      img: '1-2.png',
      title: 'Camp Lejeune',
      subtitle: 'Camp Lejeune UESC Facility Improvement Contract',
      projectType: 'Retro-Commissioning',
      industry: 'federal',
      client: 'Department of Defence',
      location: 'Jacksonville, NC',
      buildingType: 'Various',
      startDate: new Date(),
      endDate: new Date(),
      constructionCost: 15000000,
      cxCost: 15000,
      status: 'construction',
      isActive: true,
      subscription: "standard",
      subscriptionEnd: new Date(),
      notes: 'Camp Lejeune project with Avid Energy',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Projects', null, {});
  }
};