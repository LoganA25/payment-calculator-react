import { Button } from './Button'
import { useState } from 'react';

export function Calculator() {

    const [userInput, setValues] = useState({
        amount: '',
        interest: '',
        term: ''
    });

    const [results, setResults] = useState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: '',
        isResult: false
    });

    //This function is called when the user clicks the calculate button
    const handleInputValues = (e) => {
        e.preventDefault();
        const { amount, interest, term } = userInput;
        if (amount === '' || interest === '' || term === '') {
            alert('Please fill in all fields');
            return;
        }
        calculate({ amount, interest, years: term });
    }

    const handleChange = (e) => {
        setValues({
            ...userInput, [e.target.name]: e.target.value
        });
    }

    const clearFields = () => {
        setValues({
            amount: '',
            interest: '',
            term: ''
        });

        setResults({
            monthlyPayment: '',
            totalPayment: '',
            totalInterest: ''
        });
    }

    const calculate = ({ amount, interest, years }) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100 / 12;
        const calculatedPayments = Number(years) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
            const totalInterestCalculated = (
                monthly * calculatedPayments -
                userAmount
            ).toFixed(2);

            // Add commas to the numbers
            const addCommas = (num) => {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: addCommas(monthlyPaymentCalculated),
                totalPayment: addCommas(totalPaymentCalculated),
                totalInterest: addCommas(totalInterestCalculated),
                isResult: true,
            });
        }
        return;
    };

    return (
        <>
            <div className="h-screen bg-gray-200 flex justify-center items-center">
                <div className='space-y-4'>
                    <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
                        <h1 className="text-2xl font-bold sm:text-3xl text-center">Payment Calculator</h1>
                        <div>
                            <label className="text-gray-800 font-semibold block my-3 text-md" for="username">Loan amount</label>
                            <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="number" name='amount' value={userInput.amount} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold block my-3 text-md" for="username">Interest Rate</label>
                            <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="number" name='interest' value={userInput.interest} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold block my-3 text-md" for="username">Loan Term (Years)</label>
                            <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="number" name='term' value={userInput.term} onChange={handleChange} />
                        </div>
                        <div className='text-center space-y-3 space-x-4'>
                            <Button text={'Calculate'} onClick={handleInputValues} />
                            <Button text={'Clear'} onClick={clearFields} />
                        </div>

                    </form>
                    <div className="bg-white p-3 rounded-lg shadow-lg min-w-full">
                        <table className='min-w-full text-center'>
                            <thead>
                                <tr>
                                    <th>Monthly <br /> Payment</th>
                                    <th>Total <br /> Payment</th>
                                    <th>Total <br /> Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{results.monthlyPayment}</td>
                                    <td>{results.totalPayment}</td>
                                    <td>{results.totalInterest}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}


