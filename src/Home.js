import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Navbar, Nav, Button, Card, Accordion } from "react-bootstrap";
import { FaDownload, FaStar, FaComments } from 'react-icons/fa';
import "./Home.css";
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
import Features from "./Features";

const SCREENSHOTS = [
    { src: screenshot1, feature: "Dashboard" },
    { src: screenshot2, feature: "Analytics" },
    { src: screenshot3, feature: "Settings" },
    { src: screenshot4, feature: "Profile" },
    { src: screenshot5, feature: "Notifications" },
    { src: screenshot6, feature: "Messages" },
    { src: screenshot7, feature: "Dark Mode" },
    { src: screenshot8, feature: "Calendar" },
    { src: screenshot9, feature: "Tasks" },
    { src: screenshot10, feature: "Files" },
    { src: screenshot11, feature: "Contacts" },
    { src: screenshot13, feature: "Reports" }
];

const FEATURES = [
    { icon: '🚀', title: 'Blazing Fast', desc: 'Optimized for speed and performance' },
    { icon: '🔒', title: 'Secure', desc: 'Bank-level encryption for your data' },
    { icon: '🔄', title: 'Sync', desc: 'Seamless across all your devices' },
    { icon: '🎨', title: 'Customizable', desc: 'Tailor the app to your needs' },
    { icon: '📊', title: 'Analytics', desc: 'Detailed insights and reports' },
    { icon: '🤖', title: 'AI Powered', desc: 'Smart suggestions and automation' }
];

const FAQ_DATA = [
    {
        question: "Is the app free?",
        answer: "Yes, it has a free plan with premium upgrades available for advanced features."
    },
    {
        question: "Which devices are supported?",
        answer: "Our app supports both Android and iOS devices, ensuring compatibility across all major platforms."
    },
    {
        question: "How do I get started?",
        answer: "Simply download the app from your app store, create an account, and follow our intuitive onboarding process."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely! We use industry-standard encryption and security measures to protect your data."
    }
];

const STATS = [
    { number: '10K+', label: 'Downloads' },
    { number: '4.8', label: 'Rating' },
    { number: '2.5K', label: 'Reviews' }
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
                        <span className={`fw-bold poppins-bold ${scrolled ? 'text-dark' : 'text-white'}`}>Marketing Pro App</span>

                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {['home', 'features', 'screenshots', 'faq', 'download'].map((item) => (
                                <Nav.Link
                                    key={item}
                                    href={`#${item}`}
                                    className={`mx-2 ${activeNavItem === item ? 'active fw-bold' : ''}`}
                                    onClick={() => scrollToSection(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
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
                    muted
                    playsInline
                    className="hero-video"
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
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
                                <h1 className="display-3 fw-bold mb-4">Welcome to the Marketing Pro</h1>
                                <p className="lead mb-5">Experience the future of mobile technology with our revolutionary application</p>

                                <div className="d-flex gap-3">
                                    <Button
                                        variant="light"
                                        size="lg"
                                        onClick={() => scrollToSection('download')}
                                    >
                                        Download Now
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        onClick={() => scrollToSection('features')}
                                    >
                                        Learn More
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
                                <div className="h4 fw-bold mb-0">10K+</div>
                                <small className="text-muted">Downloads</small>
                            </motion.div>
                        </Col>
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <FaStar className="text-warning fs-1 mb-2" />
                                <div className="h4 fw-bold mb-0">4.8</div>
                                <small className="text-muted">Rating</small>
                            </motion.div>
                        </Col>
                        <Col xs={4} md={2}>
                            <motion.div whileInView={{ scale: [0.8, 1] }} transition={{ duration: 0.5, delay: 0.2 }}>
                                <FaComments className="text-success fs-1 mb-2" />
                                <div className="h4 fw-bold mb-0">2.5K</div>
                                <small className="text-muted">Reviews</small>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section id="features" className="py-5 bg-light">
                <Container className="py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="display-4 fw-bold text-center mb-5">Powerful Features</h2>

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

            <Features />

            {/* FAQ Section */}
            <section id="faq" className="py-5 bg-light">
                <Container className="py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="display-4 fw-bold text-center mb-5">Frequently Asked Questions</h2>

                        <Accordion className="mx-auto" style={{ maxWidth: '800px' }}>
                            {FAQ_DATA.map((item, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()} className="mb-3 border-0 shadow-sm">
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
                        <h2 className="display-4 fw-bold mb-4">Ready to Get Started?</h2>
                        <p className="lead mb-5">Download now and experience the difference</p>

                        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                            <Button variant="dark" size="lg" className="px-4 py-3">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-3">🍎</span>
                                    <div className="text-start">
                                        <div className="small">Download on the</div>
                                        <div className="fw-bold">App Store</div>
                                    </div>
                                </div>
                            </Button>

                            <Button variant="light" size="lg" className="px-4 py-3 text-dark">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-3">🤖</span>
                                    <div className="text-start">
                                        <div className="small">Get it on</div>
                                        <div className="fw-bold">Google Play</div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-4 bg-dark text-white text-center">
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
                    <div className="text-muted small mt-3">© {new Date().getFullYear()} Marketing Pro</div>
                </Container>
            </footer>

        </div>
    );
};

export default Home; 