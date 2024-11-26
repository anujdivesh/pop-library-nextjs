'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import '@/components/navbar/cardstyle.css'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaEye } from 'react-icons/fa';

export default function Home() {
  // State for dropdowns and filtered cards
  const [category, setCategory] = useState("All");
  const [documentType, setDocumentType] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [allCards, setAllCards] = useState([]);  // Store all cards here
  const [filteredCards, setFilteredCards] = useState([]);  // Store filtered/sorted cards

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");

  // Function to handle search button click
  const handleSearch = async () => {
    // Fetch data when search is triggered
    const res = await fetch('/library/cardsData.json');
    const data = await res.json();
    
    setAllCards(data);  // Set the fetched data to allCards
    const filtered = filterCards(category, documentType, data);  // Filter the data
    const sorted = sortCards(filtered, sortBy);  // Sort the filtered data
    setFilteredCards(sorted);  // Update the filteredCards state with sorted data
  };

  // Function to filter cards based on selected category and document type
  const filterCards = (category, documentType, data) => {
    let filtered = [...data];  // Start with all cards

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((card) => card.category === category);
    }

    // Filter by document type
    if (documentType !== "All") {
      filtered = filtered.filter((card) => card.document === documentType);
    }

    return filtered;
  };

  // Function to sort cards based on selected "Sort By" option
  const sortCards = (cards, sortBy) => {
    switch (sortBy) {
      case "Newest":
        return cards.sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Sort by year (newest first)
      case "Oldest":
        return cards.sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort by year (oldest first)
      case "Title":
        return cards.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
      case "Category":
        return cards.sort((a, b) => a.category.localeCompare(b.category)); // Sort alphabetically by category
      default:
        return cards;
    }
  };

  // Function to open the modal with the correct PDF
  const openModal = (pdfUrl) => {
    setPdfSrc(pdfUrl); // Set the PDF source
    setModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setPdfSrc(""); // Clear the PDF source
  };

  // Function to open PDF in a new tab for printing
  const openPdfInNewTab = (pdfUrl) => {
    window.open(pdfUrl, "_blank"); // Open PDF in a new tab
  };

  const renderDocument = (document) => {
    if (document === "tidecalendar") {
      return " Tide Calendar";
    } else if (document === "waveclimate") {
      return " Wave Climate Report";
    } else {
      return " Other";
    }
  };

  return (
    <div className="container mt-5">
      <div className="row" style={{backgroundColor:'#40E0D0', borderRadius:10, padding:15}}>
        {/* Category Dropdown */}
        <div className="col-md-3 mb-3">
          <label htmlFor="categoryDropdown" className="form-label">
            Country
          </label>
          <select
            id="categoryDropdown"
            className="form-select rounded-pill"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="American_Samoa">American Samoa</option>
            <option value="Cook_Islands">Cook Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="French_Polynesia">French Polynesia</option>
            <option value="FSM">Federated States of Micronesia</option>
            <option value="Guam">Guam</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Marshall_Islands">Marshall Islands</option>
            <option value="Nauru">Nauru</option>
            <option value="Niue">Niue</option>
            <option value="Northern_Mariana">Northern Mariana</option>
            <option value="Noumea">Noumea</option>
            <option value="Palau">Palau</option>
            <option value="Papua_New_Guinea">Papua New Guinea</option>
            <option value="Solomon_Islands">Solomon Islands</option>
            <option value="Samoa">Samoa</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Wallis">Wallis and Futuna</option>
          </select>
        </div>

        {/* Document Type Dropdown */}
        <div className="col-md-3 mb-3">
          <label htmlFor="documentDropdown" className="form-label">
            Document Type
          </label>
          <select
            id="documentDropdown"
            className="form-select rounded-pill"
            value={documentType}
            onChange={(e) => {
              setDocumentType(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="tidecalendar">Tide Calendar</option>
            <option value="waveclimate">Wave Climate Report</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="col-md-3 mb-3">
          <label htmlFor="sortDropdown" className="form-label">
            Sort By
          </label>
          <select
            id="sortDropdown"
            className="form-select rounded-pill"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-md-3 mb-3 d-flex align-items-end">
        <button className="btn btn-primary w-50" onClick={handleSearch}>
      <FaSearch style={{ marginRight: '0px', marginBottom:'1px' }} /> {/* Add the search icon before the text */}
      Search
    </button>
        </div>
      </div>

      {/* Cards Display Section */}
      <div className="row" id="cardsContainer">
        {filteredCards.length === 0 ? (
          <p style={{paddingTop:10}}> No results found. Please perform a Search.</p>
        ) : (
          filteredCards.map((card) => (
            <div key={card.id} className="col-sm-2 col-md-2 mb-4" style={{paddingTop:20}}> {/* 5 Cards per row */}
              <div className="card h-100">
                <div className="card-img-container">
                  <img
                    src={card.image}
                    className="card-img-top"
                    alt={card.title}
                    style={{
                      objectFit: "cover", // Ensures the image fits the top without stretching
                      height: "200px", // Fixes the height of the image to 200px
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.title}
                  </h5>
                  <p className="card-text">
                    {renderDocument(card.document)} <br />
                    <strong>Year:</strong> {card.year}
                  </p>
                  {/* Preview Button at the bottom of the card */}
                  <button
                    className="btn btn-primary mt-auto" style={{borderRadius:0}}
                    onClick={() => openModal(card.pdf)} // Open modal with PDF
                  >
                      <FaEye style={{ marginRight: '5px', marginBottom:'1px' }} /> 
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal with Responsive PDF Preview */}
      <Modal isOpen={modalVisible} toggle={closeModal} size="xl">
        <ModalHeader toggle={closeModal} className="modal-header-custom" style={{
            backgroundColor: '#5cb85c',  // Dark background color
            color: '#fff',  // White font color
          paddingTop: '0.5rem', // Adjust padding top
          paddingBottom: '0.5rem', // Adjust padding bottom
          fontSize: '1.25rem', // Adjust font size
        }}>Preview PDF</ModalHeader>
        <ModalBody className="p-0">
          <iframe
            src={pdfSrc}
            width="100%"
            height="580px" // Set height to 100vh for full screen
            frameBorder="0"
            title="PDF Preview"
          />
        </ModalBody>
        <ModalFooter style={{
          paddingTop: '0.5rem', // Adjust padding top
          paddingBottom: '0.5rem', // Adjust padding bottom
          fontSize: '1rem', // Adjust font size
        }}>
          <Button color="warning" onClick={() => openPdfInNewTab(pdfSrc)}>Full Screen</Button>
          <Button color="secondary" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
