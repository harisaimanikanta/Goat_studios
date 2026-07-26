const fs = require('fs');
const content = fs.readFileSync('src/components/Contact/Contact.tsx', 'utf-8');

const newHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct mailto link
    const mailtoLink = \`mailto:\${BRAND_INFO.email}?subject=\${encodeURIComponent(formData.subject)}&body=\${encodeURIComponent(
      \`Name: \${formData.name}\\nEmail: \${formData.email}\\n\\nMessage:\\n\${formData.message}\`
    )}\`;
    
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "3D Animation", message: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };`;

const updatedContent = content.replace(/const handleSubmit = \(e: React\.FormEvent\) => \{[\s\S]*?\}, 1500\);\n  \};/, newHandleSubmit);

fs.writeFileSync('src/components/Contact/Contact.tsx', updatedContent);
