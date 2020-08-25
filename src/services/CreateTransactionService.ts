/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: RequestDTO): Transaction {

    const balance = this.transactionsRepository.getBalance();

    if (type === "outcome") {
      if (value > balance.total) {
        throw Error('não tem dinheiro');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });
    return transaction;
  }
}

export default CreateTransactionService;
