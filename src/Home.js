import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Navbar, Nav, Button, Card, Accordion, Modal, Form } from "react-bootstrap";
import { FaDownload, FaStar, FaComments } from 'react-icons/fa';
import { database, ref, push, set } from './firebaseConfig'; // adjust path as needed
import "./Home.css"; // ही CSS फाईल तुमच्या प्रोजेक्टमध्ये असल्याची खात्री करा.
import { MessageCircle, Users, BarChart3, Globe, Image, Zap } from 'lucide-react';
import logo from "./assets/logo.jpeg";
import video from "./assets/mrk_vid.mp4";
import screenshot1 from "./assets/ss1.jpg";
import screenshot2 from "./assets/ss2.jpg";
import screenshot3 from "./assets/ss3.jpg";
import screenshot4 from "./assets/ss4.jpg";
import screenshot5 from "./assets/ss5.jpg";
import screenshot6 from "./assets/ss6.jpg";
import screenshot7 from "./assets/ss7.jpg";
import screenshot8 from "./assets/ss8.jpg";
import screenshot9 from "./assets/ss9.jpg";
import screenshot10 from "./assets/ss10.jpg";
import screenshot11 from "./assets/ss11.jpg";
import screenshot13 from "./assets/ss13.jpg";
import Features from "./Features"; // Features.js कॉम्पोनेंट इम्पोर्ट केला आहे.

// स्क्रीनशॉट्सची यादी
const SCREENSHOTS = [
    { src: screenshot1, feature: "डॅशबोर्ड" },
    { src: screenshot2, feature: "ॲनालिटिक्स" },
    { src: screenshot3, feature: "सेटिंग्ज" },
    { src: screenshot4, feature: "प्रोफाइल" },
    { src: screenshot5, feature: "नोटिफिकेशन्स" },
    { src: screenshot6, feature: "मेसेजेस" },
    { src: screenshot7, feature: "डार्क मोड" },
    { src: screenshot8, feature: "कॅलेंडर" },
    { src: screenshot9, feature: "टास्क" },
    { src: screenshot10, feature: "फाईल्स" },
    { src: screenshot11, feature: "कॉन्टॅक्ट्स" },
    { src: screenshot13, feature: "रिपोर्ट्स" }
];

// वैशिष्ट्यांची यादी
const FEATURES = [
    {
        icon: <Zap size={42} strokeWidth={2.2} />,
        title: "स्टेटस बूस्टर",
        desc: "तुमच्या स्टेटसचा प्रभाव वाढवा! फोनमध्ये नंबर सेव्ह नसलेल्यांनाही WhatsApp स्टेटस दाखवा आणि व्यवसायाची रीच प्रचंड वाढवा.",
    },
    {
        icon: <Image size={42} strokeWidth={2.2} />,
        title: "डेली ऑटो बॅनर जनरेटर",
        desc: "दररोज नवे आणि डिझायनर बॅनर तयार करा – फक्त एका क्लिकमध्ये! सोशल मीडियावर ते लगेच शेअर करा.",
    },
    {
        icon: <BarChart3 size={42} strokeWidth={2.2} />,
        title: "शक्तिशाली कॉल ॲनालायझर",
        desc: "बिझनेस कॉलचे पॅटर्न समजून घ्या – सर्वात सक्रिय दिवस, मिस्ड कॉल्स, बोलण्याची सरासरी वेळ आणि इतर महत्त्वाचे आकडेवारी तपासा.",
    },
    {
        icon: <MessageCircle size={42} strokeWidth={2.2} />,
        title: "ऑटोमॅटिक WhatsApp/SMS",
        desc: "प्रत्येक कॉलनंतर ग्राहकांना तुमच्या व्यवसायाचा ब्रँडेड मेसेज WhatsApp/SMS द्वारे पाठवा. तेही पूर्णपणे ऑटोमॅटिक!",
    },
    {
        icon: <Globe size={42} strokeWidth={2.2} />,
        title: "मोफत वेबसाईट बिल्डर",
        desc: "कोणत्याही तांत्रिक ज्ञानाशिवाय तुमचा व्यवसायासाठी एक प्रोफेशनल वेबसाईट तयार करा – तीही काही मिनिटांत.",
    },
    {
        icon: <Users size={42} strokeWidth={2.2} />,
        title: "स्मार्ट लीड मॅनेजमेंट",
        desc: "नवीन नंबरवरून आलेल्या कॉलनंतर ग्राहकाची माहिती साठवा. एकही संधी गमावू नका – बिझनेस वाढवण्यासाठी हीच योग्य वेळ!",
    }
];


// वारंवार विचारल्या जाणाऱ्या प्रश्नांची यादी
const FAQ_DATA = [
    {
        question: "ॲप मोफत आहे का?",
        answer: "होय, यात एक मोफत प्लॅन आहे आणि प्रगत वैशिष्ट्यांसाठी प्रीमियम अपग्रेड उपलब्ध आहेत."
    },
    {
        question: "कोणते डिव्हाइस समर्थित आहेत?",
        answer: "आमचे ॲप अँड्रॉइड आणि आयओएस दोन्ही डिव्हाइसेसना सपोर्ट करते, ज्यामुळे सर्व प्रमुख प्लॅटफॉर्मवर सुसंगतता सुनिश्चित होते."
    },
    {
        question: "मी सुरुवात कशी करू?",
        answer: "फक्त तुमच्या ॲप स्टोअरवरून ॲप डाउनलोड करा, खाते तयार करा आणि आमच्या सोप्या ऑनबोर्डिंग प्रक्रियेचे अनुसरण करा."
    },
    {
        question: "माझा डेटा सुरक्षित आहे का?",
        answer: "नक्कीच! आम्ही तुमचा डेटा संरक्षित करण्यासाठी उद्योग-मानक एन्क्रिप्शन आणि सुरक्षा उपाय वापरतो."
    },
    {
        question: "ग्राहक समर्थन कसे मिळेल?",
        answer: "तुम्ही आमच्या ॲपमधून थेट सपोर्ट टीमशी संपर्क साधू शकता किंवा support@marketingpro.com या ईमेलवर आम्हाला लिहू शकता."
    },
    {
        question: "प्रीमियम योजना घेतल्यावर मला कोणती अतिरिक्त वैशिष्ट्ये मिळतील?",
        answer: "प्रीमियम योजनेत तुम्हाला ऑटो बॅनर जनरेशन, विस्तृत ॲनालिटिक्स, आणि कस्टम WhatsApp संदेश मिळतील."
    },
    {
        question: "मी माझी योजना केव्हा पण बदलू शकतो का?",
        answer: "होय, तुम्ही तुमची योजना कधीही अपग्रेड किंवा डाऊनग्रेड करू शकता. कोणतीही अडचण नाही."
    },
    {
        question: "मी एका पेक्षा अधिक व्यवसायांसाठी वापरू शकतो का?",
        answer: "होय, प्रीमियम योजनेत तुम्हाला एकापेक्षा अधिक व्यवसायांची माहिती व्यवस्थापित करण्याची सुविधा मिळते."
    },
    {
        question: "मी डेटा बॅकअप कसा घेऊ?",
        answer: "ॲपमध्ये ‘बॅकअप’ पर्याय आहे जिथून तुम्ही तुमचा डेटा सुरक्षितरीत्या Google Drive वर सेव्ह करू शकता."
    },
    {
        question: "ॲप वापरण्यासाठी इंटरनेट आवश्यक आहे का?",
        answer: "होय, काही वैशिष्ट्यांसाठी इंटरनेट आवश्यक आहे, पण अनेक फिचर्स ऑफलाइन देखील काम करतात."
    }
];


// नेव्हिगेशन आयटम्स
const NAV_ITEMS = [
    { key: 'home', text: 'होम' },
    { key: 'features', text: 'वैशिष्ट्ये' },
    { key: 'screenshots', text: 'स्क्रीनशॉट्स' },
    { key: 'faq', text: 'FAQ' },
    { key: 'download', text: 'डाउनलोड' }
];


const Home = () => {
    const [activeNavItem, setActiveNavItem] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [currentScreenshot, setCurrentScreenshot] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        type: 'Individual',
        details: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const newRef = push(ref(database, 'MarketingPro/WebInquiries'));
            await set(newRef, formData);
            alert('तुमची माहिती यशस्वीपणे सबमिट झाली आहे!');
            setShowForm(false);
            setFormData({ name: '', phone: '', type: 'Individual', details: '' });
        } catch (error) {
            alert('डेटा सबमिट करताना त्रुटी आली.');
            console.error(error);
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const videoRef = useRef(null);

    const [isMuted, setIsMuted] = useState(true);

    // Handle audio toggle
    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Ensure autoplay works on interaction
    useEffect(() => {
        const enableAudioPlayback = async () => {
            if (videoRef.current) {
                try {
                    videoRef.current.muted = isMuted; // Keep initial mute state
                    await videoRef.current.play();
                    console.log('Video playing.');
                } catch (err) {
                    console.warn('Playback prevented:', err);
                }
            }
            window.removeEventListener('click', enableAudioPlayback);
            window.removeEventListener('touchstart', enableAudioPlayback);
        };

        window.addEventListener('click', enableAudioPlayback);
        window.addEventListener('touchstart', enableAudioPlayback);

        return () => {
            window.removeEventListener('click', enableAudioPlayback);
            window.removeEventListener('touchstart', enableAudioPlayback);
        };
    }, [isMuted]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentScreenshot(prev => (prev + 1) % SCREENSHOTS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setActiveNavItem(id);
    };

    return (
        <div className="app-container">
            {/* Navigation */}
            <Navbar expand="lg" fixed="top" className={`${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                <Container>
                    <Navbar.Brand href="#home" className="d-flex align-items-center">
                        <motion.img
                            src={logo}
                            alt="Logo"
                            width="40"
                            height="40"
                            className="me-2 rounded-circle"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                        />
                        {/* The 'poppins-bold' class (defined in Home.css) will apply Poppins */}
                        <span className={`fw-bold poppins-font ${scrolled ? 'text-dark' : 'text-white'}`}>मार्केटिंग प्रो ॲप</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {NAV_ITEMS.map((item) => (
                                <Nav.Link
                                    key={item.key}
                                    href={`#${item.key}`}
                                    className={`mx-2 ${activeNavItem === item.key ? 'active fw-bold' : ''} poppins-font`}
                                    onClick={() => scrollToSection(item.key)}
                                >
                                    {item.text}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Video Section */}
            <section id="home" className="hero-video-section poppins-font">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                >
                    <source src={video} type="video/mp4" />
                    तुमचा ब्राउझर व्हिडिओ टॅगला सपोर्ट करत नाही.
                </video>
                <div className="video-overlay"></div>
                <Container className="hero-content">
                    <Row className="align-items-center min-vh-100">
                        <Col lg={6} className="text-white">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="display-3 fw-bold mb-4 poppins-font">
                                    मार्केटिंग प्रो मध्ये आपले स्वागत आहे
                                </h1>
                                <p className="lead mb-4 poppins-font">
                                    आमच्या क्रांतिकारी ॲप्लिकेशनसह मोबाइल तंत्रज्ञानाच्या भविष्याचा अनुभव घ्या
                                </p>

                                <div className="d-flex flex-wrap gap-3 mb-3">
                                    <Button
                                        variant="light"
                                        size="lg"
                                        onClick={() => {
                                            setShowModal(true);              // Show the modal
                                            if (videoRef.current) {
                                                videoRef.current.muted = true; // Mute the background video
                                            }
                                        }}
                                        className="poppins-font"
                                    >
                                        डेमो व्हिडिओ बघा
                                    </Button>

                                    {/* Button that opens the form modal */}
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        onClick={() => setShowForm(true)}
                                        className="poppins-font"
                                    >
                                        संपर्क करा
                                    </Button>

                                    {/* Inquiry Form Modal */}
                                    <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>ॲप नोंदणी फॉर्म</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Form.Group controlId="formName">
                                                            <Form.Label>नाव</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="तुमचं पूर्ण नाव"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="formPhone">
                                                            <Form.Label>फोन नंबर</Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                placeholder="10 अंकी नंबर"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Form.Group className="mb-3" controlId="formType">
                                                    <Form.Label>ॲप कुणासाठी हवे आहे?</Form.Label>
                                                    <Form.Select
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="Individual">वैयक्तिक (Individual)</option>
                                                        <option value="Organization">संस्था (Organization)</option>
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formDetails">
                                                    <Form.Label>विवरण</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder="तुमच्या गरजा किंवा चौकशीचे तपशील लिहा..."
                                                        name="details"
                                                        value={formData.details}
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowForm(false)}>
                                                रद्द करा
                                            </Button>
                                            <Button variant="primary" onClick={handleSubmit}>
                                                सबमिट करा
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        onClick={toggleAudio}
                                        className="poppins-font"
                                    >
                                        {isMuted ? 'ऑडिओ सुरू करा 🔊' : 'ऑडिओ बंद करा 🔇'}
                                    </Button>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Youtube video Section */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>डेमो व्हिडिओ</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="ratio ratio-16x9">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/ufBP5LsBcJ4"
                            title="Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Modal.Body>
            </Modal>


            {/* Fresh Stats Section */}
            <section className="stats-section py-4 bg-white poppins-font">
                <Container>
                    <Row className="justify-content-center text-center gx-0">
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5 }}>
                                <FaDownload className="text-primary fs-1 mb-2" />
                                {/* These texts will inherit Poppins from the body or specific classes in Home.css */}
                                <div className="h4 fw-bold mb-0">50K+</div>
                                <small className="text-muted">डाउनलोड्स</small>
                            </motion.div>
                        </Col>
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <FaStar className="text-warning fs-1 mb-2" />
                                <div className="h4 fw-bold mb-0">4.8</div>
                                <small className="text-muted">रेटिंग</small>
                            </motion.div>
                        </Col>
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5, delay: 0.2 }}>
                                <FaComments className="text-success fs-1 mb-2" />
                                <div className="h4 fw-bold mb-0">2.5K</div>
                                <small className="text-muted">रिव्ह्यूज</small>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Enhanced Screenshots Section */}
            <section id="screenshots" className="py-6 poppins-font screenshot-section-bg"> {/* Custom background class and increased padding */}
                <Container className="py-5">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} // Animation for the whole section
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="display-3 fw-bolder text-center mb-5 screenshot-title-custom poppins-font"> {/* Custom title styling */}
                            ॲप स्क्रीनशॉट्स {/* App Screenshots */}
                        </h2>
                    </motion.div>

                    <div className="position-relative d-flex justify-content-center align-items-center overflow-hidden screenshot-carousel-container" style={{ height: '85vh' }}> {/* Increased height for more visual impact */}
                        {SCREENSHOTS.map((shot, idx) => {
                            const offset = (idx - currentScreenshot + SCREENSHOTS.length) % SCREENSHOTS.length;
                            let positionProps = {};
                            let imageClasses = "position-absolute img-fluid rounded-4 shadow-lg screenshot-image"; // Base classes for all images
                            let imageStyle = { maxHeight: '75vh', cursor: 'pointer' }; // Base style

                            if (offset === 0) { // Current (active) screenshot
                                positionProps = { x: 0, scale: 1, opacity: 1, zIndex: 3 }; // Higher zIndex for active image
                                imageClasses += " phone-frame-mock"; // Apply phone frame styling
                                // Adjust style to fit within the "frame" if needed, or let CSS handle it
                                imageStyle = {
                                    ...imageStyle,
                                    maxHeight: '70vh', // Slightly smaller to fit inside mock frame
                                    width: 'auto',
                                    filter: 'none', // Ensure no blur
                                    // These values will be fine-tuned in CSS for the .phone-frame-mock
                                    // top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                };
                            } else if (offset === 1) { // Next screenshot
                                positionProps = { x: 250, scale: 0.6, opacity: 0.3, zIndex: 1 }; // More offset, smaller, less opaque
                                imageClasses += " blurred-screenshot"; // Apply blur
                                imageStyle = { ...imageStyle, filter: 'blur(4px)' }; // Apply blur directly
                            } else if (offset === SCREENSHOTS.length - 1) { // Previous screenshot
                                positionProps = { x: -250, scale: 0.6, opacity: 0.3, zIndex: 1 }; // More offset, smaller, less opaque
                                imageClasses += " blurred-screenshot"; // Apply blur
                                imageStyle = { ...imageStyle, filter: 'blur(4px)' }; // Apply blur directly
                            } else {
                                return null; // Hide other screenshots
                            }

                            return (
                                <motion.img
                                    key={idx}
                                    src={shot.src}
                                    alt={shot.feature}
                                    className={imageClasses}
                                    style={imageStyle}
                                    animate={positionProps}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    onClick={() => {
                                        if (offset === 1) setCurrentScreenshot(idx);
                                        else if (offset === SCREENSHOTS.length - 1) setCurrentScreenshot(idx);
                                    }}
                                />
                            );
                        })}
                        {/* Carousel Navigation Buttons */}
                        <button className="carousel-btn left-ctrl" onClick={() => setCurrentScreenshot((s) => (s - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}>
                            <i className="bi bi-chevron-left"></i> {/* Bootstrap Icon */}
                        </button>
                        <button className="carousel-btn right-ctrl" onClick={() => setCurrentScreenshot((s) => (s + 1) % SCREENSHOTS.length)}>
                            <i className="bi bi-chevron-right"></i> {/* Bootstrap Icon */}
                        </button>
                    </div>
                </Container>
            </section>



            <Features /> {/* This component already has its own CSS for Poppins */}

            <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
  * {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }

  .cf-section-bg {
    background: linear-gradient(135deg, #f9fafe, #e3f2fd);
    padding: 4rem 0 2rem 0;
  }

  .cf-title {
    font-size: 2.6rem;
    font-weight: 700;
    text-align: center;
    color: #2a2d34;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  }

  .cf-card {
    background: linear-gradient(145deg, #ffffff, #f0f6ff);
    border: 1px solid #dfe8f3;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
    transition: all 0.3s ease;
    height: 100%;
    padding: 2rem;
  }

  .cf-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }

  .cf-icon-wrap {
    background: radial-gradient(circle at 30% 30%, #5e9cff, #3a70d0);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 18px rgba(94, 156, 255, 0.3);
    margin-bottom: 1.2rem;
  }

  .cf-feature-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #263238;
    margin-bottom: 0.6rem;
  }

  .cf-feature-desc {
    font-size: 0.96rem;
    color: #546e7a;
    line-height: 1.55;
  }

  .cf-row {
    row-gap: 1.5rem;
  }

  @media (max-width: 767px) {
    .cf-title {
      font-size: 2rem;
    }
    .cf-card {
      padding: 1.5rem;
    }
  }
`}</style>


            <section id="features" className="cf-section-bg">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="cf-title">शक्तिशाली वैशिष्ट्ये</h2>

                        <Row className="cf-row justify-content-center">
                            {FEATURES.map((feature, index) => (
                                <Col key={index} xs={12} sm={6} md={4}>
                                    <motion.div
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-100"
                                    >
                                        <Card className="cf-card text-center p-4 d-flex flex-column align-items-center justify-content-center">
                                            <div className="cf-icon-wrap">{feature.icon}</div>
                                            <h3 className="cf-feature-title">{feature.title}</h3>
                                            <p className="cf-feature-desc">{feature.desc}</p>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                </Container>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-5 bg-light poppins-font">
                <Container className="py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* This heading will inherit Poppins from Home.css */}
                        <h2 className="display-4 fw-bold text-center mb-5">वारंवार विचारले जाणारे प्रश्न</h2>
                        <Accordion className="mx-auto" style={{ maxWidth: '800px' }}>
                            {FAQ_DATA.map((item, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()} className="mb-3 border-0 shadow-sm poppins-font">
                                    {/* These will inherit Poppins from the accordion item's class */}
                                    <Accordion.Header className="fw-bold">
                                        {item.question}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {item.answer}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </motion.div>
                </Container>
            </section>

            {/* Download Section */}
            <section id="download" className="py-5 bg-primary text-white poppins-font">
                <Container className="py-5 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* These headings will inherit Poppins from the section or specific classes in Home.css */}
                        <h2 className="display-4 fw-bold mb-4">सुरुवात करण्यास तयार आहात का?</h2>
                        <p className="lead mb-5">आताच डाउनलोड करा आणि फरक अनुभवा</p>
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                            {/* <Button variant="dark" size="lg" className="px-4 py-3 poppins-font">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-3">🍎</span>
                                    <div className="text-start">
                                        <div className="small">येथून डाउनलोड करा</div>
                                        <div className="fw-bold">ॲप स्टोअर</div>
                                    </div>
                                </div>
                            </Button>
                            <Button variant="light" size="lg" className="px-4 py-3 text-dark poppins-font">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-3">🤖</span>
                                    <div className="text-start">
                                        <div className="small">येथे मिळवा</div>
                                        <div className="fw-bold">गुगल प्ले</div>
                                    </div>
                                </div>
                            </Button> */}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-4 bg-dark text-white text-center poppins-font">
                <Container>
                    <div className="d-flex justify-content-center gap-4 fs-3">

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@DigitalSchoolSoftware"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white youtube-icon"
                            aria-label="YouTube"
                        >
                            <i className="bi bi-youtube"></i>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/itpl_sangli/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white instagram-icon"
                            aria-label="Instagram"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/918055514368"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white whatsapp-icon"
                            aria-label="WhatsApp"
                        >
                            <i className="bi bi-whatsapp"></i>
                        </a>

                    </div>

                    {/* Footer Text */}
                    <div className="text-muted small mt-3">© {new Date().getFullYear()} मार्केटिंग प्रो</div>
                </Container>
            </footer>

        </div>
    );
};

export default Home;