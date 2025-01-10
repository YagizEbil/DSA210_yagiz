import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { goals } from './Goals';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGoalsDropdownOpen, setIsGoalsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setIsGoalsDropdownOpen(false);
    }
  };

  const handleGoalClick = (goalId: string) => {
    navigate(`/goals/${goalId}`);
    setIsGoalsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-roboto font-bold text-xl text-primary">DSA210_Yagiz</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['dataset', 'sensors'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="font-merriweather text-gray-600 hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
            
            {/* Goals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsGoalsDropdownOpen(!isGoalsDropdownOpen)}
                className="font-merriweather text-gray-600 hover:text-primary transition-colors capitalize inline-flex items-center"
              >
                Goals
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isGoalsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isGoalsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalClick(goal.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {goal.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {['contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="font-merriweather text-gray-600 hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['dataset', 'sensors'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
            
            {/* Mobile Goals Menu */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-gray-600 font-medium">Goals</div>
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalClick(goal.id)}
                  className="block w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {goal.title}
                </button>
              ))}
            </div>

            {['contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;