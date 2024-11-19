import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Euro, Briefcase, Computer } from 'lucide-react';

const BudgetCalculator = () => {
  const [worldlineSalary, setWorldlineSalary] = useState('');
  const [freelanceSalary, setFreelanceSalary] = useState('');
  const [showResults, setShowResults] = useState(false);

  const FIXED_COSTS = [
    { name: 'Mix', amount: 180, color: 'bg-emerald-100' },
    { name: 'Orange + Apple', amount: 80, color: 'bg-sky-100' },
    { name: 'Ongles', amount: 50, color: 'bg-pink-100' },
    { name: 'CC', amount: 60, color: 'bg-purple-100' },
    { name: 'Epargne', amount: 113, color: 'bg-amber-100' },
    { name: 'Mutuelle', amount: 13, color: 'bg-blue-100' }
  ];

  const EXPENSES = 800;
  const REVOLUT_CAP = 650;
  const totalFixedCosts = FIXED_COSTS.reduce((sum, cost) => sum + cost.amount, 0);

  const calculations = () => {
    const worldlineNum = Number(worldlineSalary) || 0;
    const freelanceNum = Number(freelanceSalary) || 0;
    const netFreelance = freelanceNum * 0.4;
    const totalIncome = worldlineNum + netFreelance;
    const disposableIncome = worldlineNum - totalFixedCosts - EXPENSES;
    
    let revolutAllocation = (0.25 * disposableIncome) + (0.2 * netFreelance);
    const excess = revolutAllocation > REVOLUT_CAP ? revolutAllocation - REVOLUT_CAP : 0;
    revolutAllocation = Math.min(revolutAllocation, REVOLUT_CAP);
    const degiroAllocation = (0.75 * disposableIncome) + (0.8 * netFreelance) + excess;
    
    return {
      netFreelance,
      totalIncome,
      degiroAllocation,
      revolutAllocation,
      showCelebration: (worldlineNum + netFreelance) > 4000
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleGenerate = () => {
    setShowResults(true);
  };

  const results = calculations();

  return (
    <div className="space-y-6 w-full max-w-4xl bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Camille's Budget
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Worldline Salary (Net)</h3>
              </div>
              <div className="relative">
                <Euro className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <Input
                  type="number"
                  className="pl-10 h-12 text-lg font-medium bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  value={worldlineSalary}
                  onChange={(e) => setWorldlineSalary(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Computer className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Freelance Salary (Gross)</h3>
              </div>
              <div className="relative">
                <Euro className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                <Input
                  type="number"
                  className="pl-10 h-12 text-lg font-medium bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  value={freelanceSalary}
                  onChange={(e) => setFreelanceSalary(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleGenerate}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Generate Allocations
        </Button>
      </div>

      {results.showCelebration && showResults && (
        <div className="text-center py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg animate-bounce">
          <h2 className="text-2xl font-bold text-white">🎉 Bravo Bébé! 🎉</h2>
        </div>
      )}

      {showResults && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-lg bg-white">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Fixed Costs</h3>
            </div>
            <CardContent>
              <div className="space-y-3">
                {FIXED_COSTS.map((cost) => (
                  <div key={cost.name} className={`flex justify-between p-3 rounded-lg ${cost.color}`}>
                    <span className="font-medium text-gray-700">{cost.name}</span>
                    <span className="font-semibold">{formatCurrency(cost.amount)}</span>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total Fixed Costs</span>
                    <span>{formatCurrency(totalFixedCosts)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Monthly Allocations</h3>
            </div>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg">
                  <div className="flex justify-between font-bold text-emerald-800">
                    <span>Degiro</span>
                    <span>{formatCurrency(results.degiroAllocation)}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-lg">
                  <div className="flex justify-between font-bold text-indigo-800">
                    <span>Revolut Extra</span>
                    <span>{formatCurrency(results.revolutAllocation)}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg">
                  <div className="flex justify-between font-bold text-orange-800">
                    <span>Monthly Expenses</span>
                    <span>{formatCurrency(EXPENSES)}</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg">
                  <div className="flex justify-between font-bold text-blue-800">
                    <span>Total Income</span>
                    <span>{formatCurrency(results.totalIncome)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
