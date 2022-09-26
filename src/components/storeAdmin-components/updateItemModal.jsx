import { Form, Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const UpdateItemModal = ({test}) => {

//state variables
var [item, setItem] = useState([]);
var [itemName, setName] = useState();
var [description, setDescription] = useState();
var [price, setPrice] = useState();
var [quantity, setQuantity] = useState();
var [images, setImages] = useState();
var [offer, setOffer] = useState();

// Dealing with field changes to update state
const nameUpdate = (event) => {
    setName(event.target.value)
}
const descriptionUpdate = (event) => {
    setDescription(event.target.value)
}
const priceUpdate = (event) => {
    setPrice(event.target.value)
}
const quantityUpdate = (event) => {
    setQuantity(event.target.value)
}
const imagesUpdate = (event) => {
    setImages(event.target.value)
}
const offerUpdate = (event) => {
    setOffer(event.target.value)
}

const getItem = async () => {
    try {
        const response = await axios.get('http://localhost:5050/storeAdmin/' + window.sessionStorage.getItem('item'));
        // setItem(response.data);
        setName(response.data.itemName);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
        setImages(response.data.images);
        setOffer(response.data.offer);
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
    getItem();
}, [])

const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity,
        images: images,
        offer: offer,
    }
    axios.post('http://localhost:5050/storeAdmin/update/' + window.sessionStorage.getItem('item'), item)
        .then(res => {alert("Successfully updated"), window.location = '/storeAdmin';});

    
}

    return (
        
        <Form onSubmit={handleSubmit}>
        <Container>
            <Row>
                <Col xs={9} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label> Item Name </Form.Label>
                        <Form.Control defaultValue={itemName} onChange={nameUpdate} type="text" placeholder="Enter item name" required/>
                    </Form.Group>
                </Col>
                <Col xs={9} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label> Quantity </Form.Label>
                        <Form.Control type="number" min="0" defaultValue={quantity} onChange={quantityUpdate} type="text" placeholder="Enter quantity" required/>

                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={9} md={6}>
                <Form.Group className="mb-3" >
                    <Form.Label> Description </Form.Label>
                    <Form.Control defaultValue={description} onChange={descriptionUpdate} type="text" placeholder="Enter description" required/>
                </Form.Group>
                </Col>
                <Col xs={9} md={6}>
                <Form.Group className="mb-3" >
                    <Form.Label> Images </Form.Label>
                    <Form.Control defaultValue={images} onChange={imagesUpdate} type="text" placeholder="Enter the image url " required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={9} md={6}>
                <Form.Group className="mb-3" >
                    <Form.Label> Price </Form.Label>
                    <Form.Control defaultValue={price} onChange={priceUpdate} type="text" placeholder="Enter price" required/>
                </Form.Group>
                </Col>
                <Col xs={9} md={6}>
                <Form.Group className="mb-3" >
                    <Form.Label> Offer (%) </Form.Label>
                    <Form.Control type="text" title="Must contain two numbers" pattern="[0-9]{1,2}" defaultValue={offer} onChange={offerUpdate} placeholder="Enter offer percentage" required/>

                </Form.Group>
                </Col>
            </Row>
            <Row>
                <center>
            <button style={{width: "60%", textAlign: "center"}} className="btn btn-dark" variant="primary" type="submit">
                    Submit
                </button>
                </center>
            </Row>

        </Container>
        </Form>
    )
}

export default UpdateItemModal;
