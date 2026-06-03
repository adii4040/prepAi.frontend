function Footer() {
    return (
        <footer className="bg-tertiary shadow-md text-primary py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} PrepAI. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;