import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import Modal from 'react-modal';
import 'react-resizable/css/styles.css';
import './canvas.css';

Modal.setAppElement('#root');

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: cards.length,
      text: 'This is a sample text. Click Show More to see the full content. This text represents more details that will be shown in the popup.',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
    };
    setCards([...cards, newCard]);
  };

  const openModal = (card) => {
    setCurrentCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentCard(null);
  };

  return (
    <div className="canvas-container" >
      <button className='but' style={{margin:"5% 46% "}} onClick={addCard}>Add Card</button>
      {cards.map((card, index) => (
        <Draggable
          key={index}
          defaultPosition={card.position}
          onStop={(e, data) => {
            const newCards = [...cards];
            newCards[index].position = { x: data.x, y: data.y };
            setCards(newCards);
          }}
        >
          <ResizableBox
            width={card.size.width}
            height={card.size.height}
            onResizeStop={(e, data) => {
              const newCards = [...cards];
              newCards[index].size = { width: data.size.width, height: data.size.height };
              setCards(newCards);
            }}
          >
            <div className="card">
              <p>{card.text.slice(0, 20)}...</p>
              <button onClick={() => openModal(card)}>Show More</button>
            </div>
          </ResizableBox>
        </Draggable>
      ))}
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Details"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Card Details</h2>
        <p>{currentCard?.text}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Canvas;
