import React, { useState } from 'react';
import { Download, MessageCircle, Users, BarChart3, Globe, Image, Zap } from 'lucide-react';
import { Modal, Button, Form } from 'react-bootstrap';
import { database, ref, push, set } from './firebaseConfig'; // ✅ CORRECT

const FeatureCard = ({ icon, title, description }) => (
  <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
    <div className="card w-100 feature-card shadow-sm border-0 rounded-4">
      <div className="card-body p-4 p-lg-5 text-center d-flex flex-column">
        <div className="feature-icon-wrapper mx-auto mb-4">
          <div className="feature-icon">
            {icon}
          </div>
        </div>
        <h5 className="card-title fw-bold mb-3">{title}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>
      </div>
    </div>
  </div>
);

export default function Features() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: 'individual',
    inquiry: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRef = push(ref(database, 'MarketingPro/WebInquiries'));
    await set(newRef, form);
    alert('तुमची माहिती यशस्वीरित्या पाठवली गेली!');
    setForm({ name: '', phone: '', type: 'individual', inquiry: '' });
    setShowModal(false);
  };

  const appFeatures = [
    { icon: <MessageCircle size={36} />, title: "ऑटोमॅटिक WhatsApp/SMS", description: "प्रत्येक कॉल नंतर ग्राहकांना तुमच्या व्यवसायाचा आकर्षक मेसेज आपोआप पाठवा..." },
    { icon: <Users size={36} />, title: "स्मार्ट लीड मॅनेजमेंट", description: "प्रत्येक अनोळखी कॉल नंतर एक पॉप-अप मिळवा आणि एका क्लिकवर नवीन ग्राहकांची माहिती जतन करा..." },
    { icon: <BarChart3 size={36} />, title: "शक्तिशाली कॉल ॲनालायझर", description: "तुमच्या व्यवसायाच्या कॉल्सचे संपूर्ण विश्लेषण मिळवा..." },
    { icon: <Globe size={36} />, title: "मोफत वेबसाईट बिल्डर", description: "तुमच्या व्यवसायाची माहिती भरा आणि काही क्षणांत एक व्यावसायिक वेबसाईट तयार करा..." },
    { icon: <Image size={36} />, title: "डेली ऑटो बॅनर जनरेटर", description: "दररोज नवीन आणि आकर्षक जाहिरात बॅनर मिळवा..." },
    { icon: <Zap size={36} />, title: "स्टेटस बूस्टर", description: "ज्यामुळे तुमच्या फोनमध्ये सेव्ह नसलेल्या लोकांनाही तुमचा WhatsApp स्टेटस दिसेल..." },
  ];

  return (
    <>
      <style>{`
        /* --- General & Font --- */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        /* --- Keyframes for Animations --- */
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-glow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        /* --- Features Section --- */
        .features-section {
          padding: 7rem 0;
          background: linear-gradient(-45deg, #e0e7ff, #f3e8ff, #e0f7fa, #d1e4ff);
          background-size: 400% 400%;
          animation: gradient-animation 20s ease infinite;
          overflow: hidden; /* Hide overflow for tilted elements */
        }
        .section-title {
          font-size: clamp(2.2rem, 5vw, 2.8rem);
          font-weight: 700;
          color: #1e293b; /* Darker blue-gray */
          margin-bottom: 1rem;
        }
        .section-subtitle {
          font-size: 1.15rem;
          color: #475569; /* Softer slate gray */
          max-width: 600px;
          margin: 0 auto 3rem auto;
        }

        /* --- Feature Card & Icon --- */
        .feature-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }
        .feature-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 25px 40px rgba(30, 41, 59, 0.1);
        }
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #818cf8, #c084fc);
          box-shadow: 0 10px 20px rgba(129, 140, 248, 0.3);
          animation: subtle-bounce 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .feature-icon {
          color: #fff;
          transition: transform 0.3s ease;
        }
        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
        }
        .feature-card:hover .feature-icon {
          transform: rotate(-10deg);
        }
        .feature-card .card-title {
          color: #334155;
        }

        /* --- CTA Section --- */
        .cta-section {
          padding: 6rem 0;
          color: white;
          text-align: center;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #db2777);
          background-size: 300% 300%;
          animation: gradient-animation 15s ease infinite;
        }
        .cta-title {
          font-size: clamp(2rem, 5vw, 2.6rem);
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          margin-bottom: 1rem;
        }
        .cta-subtitle {
          font-size: 1.2rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto 2.5rem auto;
          opacity: 0.9;
        }
        .cta-btn {
          background-color: #fff;
          color: #4f46e5;
          font-weight: 600;
          padding: 1rem 2.8rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: pulse-glow 2.5s infinite;
        }
        .cta-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
        }
        
        /* --- Modal Styling --- */
        .modal-content {
          border-radius: 1rem;
          border: none;
        }
        .modal-header {
          border-bottom: none;
        }
        .modal-footer {
            border-top: none;
        }
      `}</style>

      <div className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">तुमच्या व्यवसायाला बनवा 'ऑटोमॅटिक'</h2>
            <p className="lead section-subtitle">
              जाहिरातीवरचा खर्च थांबवा! 'मार्केटिंग प्रो' ॲपसोबत तुमचा व्यवसाय पूर्णपणे मोफत वाढवा.
            </p>
          </div>
          <div className="row justify-content-center">
            {appFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h3 className="cta-title">मग आता वाट कसली पाहताय?</h3>
          <p className="cta-subtitle">
            आजच 'मार्केटिंग प्रो' ॲप डाउनलोड करा आणि तुमचा व्यवसाय नव्या उंचीवर घेऊन जा!
          </p>
          <button className="cta-btn" onClick={() => setShowModal(true)}>
            <Download className="me-2" />
            संपर्क करा
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ॲप नोंदणी फॉर्म</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>नाव</Form.Label>
              <Form.Control name="name" placeholder="तुमचं पूर्ण नाव" value={form.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>फोन नंबर</Form.Label>
              <Form.Control name="phone" placeholder="10 अंकी नंबर" value={form.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ॲप कोणासाठी पाहिजे?</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleChange}>
                <option value="Individual">वैयक्तिक (Individual)</option>
                <option value="Organization">संस्था (Organization)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>विवरण</Form.Label>
              <Form.Control as="textarea" placeholder="तुमच्या गरजा किंवा चौकशीचे तपशील लिहा..." rows={3} name="inquiry" value={form.inquiry} onChange={handleChange} />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                रद्द करा
              </Button>
              <Button type="submit" variant="primary">
                सबमिट करा
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}