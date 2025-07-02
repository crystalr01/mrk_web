import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Navbar, Nav, Button, Card, Accordion } from "react-bootstrap";
import { FaDownload, FaStar, FaComments } from 'react-icons/fa';
import "./Home.css"; // ही CSS फाईल तुमच्या प्रोजेक्टमध्ये असल्याची खात्री करा.
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
    { icon: '🚀', title: 'अतिशय वेगवान', desc: 'वेग आणि कामगिरीसाठी ऑप्टिमाइज केलेले' },
    { icon: '🔒', title: 'सुरक्षित', desc: 'तुमच्या डेटासाठी बँक-स्तरीय एन्क्रिप्शन' },
    { icon: '🔄', title: 'सिंक', desc: 'तुमच्या सर्व डिव्हाइसेसवर अखंडपणे' },
    { icon: '🎨', title: 'सानुकूल करण्यायोग्य', desc: 'तुमच्या गरजेनुसार ॲप तयार करा' },
    { icon: '📊', title: 'ॲनालिटिक्स', desc: 'तपशीलवार माहिती आणि रिपोर्ट्स' },
    { icon: '🤖', title: 'AI आधारित', desc: 'स्मार्ट सूचना आणि ऑटोमेशन' }
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
    const videoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            // Removed 'muted' prop to enable audio
            videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
        }
    }, []);

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
            <section id="home" className="hero-video-section">
                <video
                    ref={videoRef}
                    autoPlay
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
                                {/* These headings will inherit Poppins from the body or specific classes in Home.css */}
                                <h1 className="display-3 fw-bold mb-4">मार्केटिंग प्रो मध्ये आपले स्वागत आहे</h1>
                                <p className="lead mb-5">आमच्या क्रांतिकारी ॲप्लिकेशनसह मोबाइल तंत्रज्ञानाच्या भविष्याचा अनुभव घ्या</p>
                                <div className="d-flex gap-3">
                                    <Button
                                        variant="light"
                                        size="lg"
                                        onClick={() => scrollToSection('download')}
                                        className="poppins-font" // Ensure button text uses Poppins
                                    >
                                        आताच डाउनलोड करा
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        onClick={() => scrollToSection('features')}
                                        className="poppins-font" // Ensure button text uses Poppins
                                    >
                                        अधिक जाणून घ्या
                                    </Button>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Fresh Stats Section */}
            <section className="stats-section py-4 bg-white">
                <Container>
                    <Row className="justify-content-center text-center gx-0">
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5 }}>
                                <FaDownload className="text-primary fs-1 mb-2" />
                                {/* These texts will inherit Poppins from the body or specific classes in Home.css */}
                                <div className="h4 fw-bold mb-0">10K+</div>
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
                                <small className="text-muted">पुनरावलोकने</small>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section (Placeholder for your Features component) */}
            <section id="features" className="py-5 bg-light">
                <Container className="py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* This heading will inherit Poppins from Home.css */}
                        <h2 className="display-4 fw-bold text-center mb-5">शक्तिशाली वैशिष्ट्ये</h2>
                        <Row className="g-4">
                            {FEATURES.map((feature, index) => (
                                <Col key={index} md={6} lg={4}>
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="h-100 border-0 shadow-sm">
                                            <Card.Body className="text-center p-4">
                                                <div className="display-4 mb-3">{feature.icon}</div>
                                                {/* These will inherit Poppins from Card styles in Home.css */}
                                                <h3 className="h4 mb-3">{feature.title}</h3>
                                                <p className="text-muted mb-0">{feature.desc}</p>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                </Container>
            </section>

            {/* Enhanced Screenshots Section */}
            <section id="screenshots" className="bg-dark text-white py-5">
                <Container fluid className="px-0">
                    <div className="position-relative d-flex justify-content-center align-items-center overflow-hidden" style={{ height: '80vh' }}>
                        {SCREENSHOTS.map((shot, idx) => {
                            const offset = (idx - currentScreenshot + SCREENSHOTS.length) % SCREENSHOTS.length;
                            let positionProps = {};

                            if (offset === 0) positionProps = { x: 0, scale: 1, opacity: 1, zIndex: 2 };
                            else if (offset === 1 || (offset === 0 && currentScreenshot === SCREENSHOTS.length - 1)) positionProps = { x: 200, scale: 0.7, opacity: 0.5, zIndex: 1 };
                            else if (offset === SCREENSHOTS.length - 1 || (offset === -1 + SCREENSHOTS.length)) positionProps = { x: -200, scale: 0.7, opacity: 0.5, zIndex: 1 };
                            else return null;

                            return (
                                <motion.img
                                    key={idx}
                                    src={shot.src}
                                    alt={shot.feature}
                                    className="position-absolute img-fluid rounded shadow-lg"
                                    style={{ maxHeight: '80vh', cursor: 'pointer' }}
                                    animate={positionProps}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    onClick={() => {
                                        if (offset === 1) setCurrentScreenshot(idx);
                                        else if (offset === SCREENSHOTS.length - 1) setCurrentScreenshot(idx);
                                    }}
                                />
                            );
                        })}
                        <button className="carousel-btn left-ctrl" onClick={() => setCurrentScreenshot((s) => (s - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}>‹</button>
                        <button className="carousel-btn right-ctrl" onClick={() => setCurrentScreenshot((s) => (s + 1) % SCREENSHOTS.length)}>›</button>
                    </div>
                </Container>
            </section>

            <Features /> {/* This component already has its own CSS for Poppins */}

            {/* FAQ Section */}
            <section id="faq" className="py-5 bg-light">
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
            <section id="download" className="py-5 bg-primary text-white">
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
                            <Button variant="dark" size="lg" className="px-4 py-3 poppins-font">
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
                            </Button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-4 bg-dark text-white text-center poppins-font">
                <Container>
                    <div className="d-flex justify-content-center gap-4 fs-3">
                        <a href="#" className="text-white" aria-label="YouTube">
                            <i className="bi bi-youtube"></i>
                        </a>
                        <a href="#" className="text-white" aria-label="Instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="text-white" aria-label="WhatsApp">
                            <i className="bi bi-whatsapp"></i>
                        </a>
                    </div>
                    {/* This text will inherit Poppins from the footer's class */}
                    <div className="text-muted small mt-3">© {new Date().getFullYear()} मार्केटिंग प्रो</div>
                </Container>
            </footer>
        </div>
    );
};

export default Home;