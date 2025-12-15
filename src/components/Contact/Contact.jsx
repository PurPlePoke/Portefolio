import { useState } from "react";
import "./Contact.css";
import { MdEmail, MdPhone, MdLocationOn, MdMessage } from "react-icons/md";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: MdEmail,
      title: "Email",
      value: "killianlawson77@gmail.com"
    },
    {
      icon: MdPhone,
      title: "Téléphone",
      value: "+33 7 69 31 44 30"
    },
    {
      icon: MdLocationOn,
      title: "Localisation",
      value: "Paris, France"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé:", formData);
    setFormData({ nom: "", prenom: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="section__title">
          <div className="section__sidebar"></div>
          <h2 className="contact__title">contact</h2>
          <div className="section__sidebar"></div>
        </div>
        <p className="contact__subtitle">Une question ? Une opportunité ?</p>
        <p className="contact__description">
          N'hésitez pas à me contacter pour discuter de vos projets ou pour toute collaboration.
          Je suis toujours ouvert aux nouvelles opportunités et aux échanges constructifs.
        </p>
        

        <div className="contact__content">
          {/* Côté gauche - Cartes de contact */}
          <div className="contact__left">
            <div className="contact__cards">
              {contactInfo.map((info, i) => {
                const IconComponent = info.icon;
                return (
                  <div className="contact__card" key={i} style={{ "--card-delay": `${i * 0.1}s` }}>
                    <div className="contact__card-icon">
                      <IconComponent />
                    </div>
                    <div className="contact__card-content">
                      <h3>{info.title}</h3>
                      <p>{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Côté droit - Formulaire */}
          <div className="contact__right">
            <div className="contact__form-header">
              <MdMessage className="contact__form-icon" />
              <h3>Envoyez moi un message</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact__button">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
