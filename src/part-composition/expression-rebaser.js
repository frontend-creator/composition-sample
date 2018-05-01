import {ExpressionCloner, AccessMember, CallMember} from 'aurelia-binding';

export class ExpressionRebaser extends ExpressionCloner {
  
  constructor(base) {
    super();
    this.base = base;
  }

  visitAccessThis(access) {
    if (access.ancestor !== 0) {
      throw new Error('$parent expressions cannot be rebased.');
    }
    return this.base;
  }

  visitAccessScope(access) {
    console.log('visitAccessScope:', this.base, access);
    if (access.ancestor !== 0) {
      throw new Error('$parent expressions cannot be rebased.');
    }
    return new AccessMember(this.base, access.name);
  }

  visitCallScope(call) {
    if (call.ancestor !== 0) {
      throw new Error('$parent expressions cannot be rebased.');
    }
    return new CallMember(this.base, call.name, this.cloneExpressionArray(call.args));
  }
}

export function rebaseExpression(expression, baseExpression) {
  console.log('rebaseExpression', expression, baseExpression);
  let visitor = new ExpressionRebaser(baseExpression);
  return expression.accept(visitor);
}
