#include <node.h>
#include "explainReturnValue.h"

using namespace v8;
using namespace explainReturnValue;

void add(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    int num1 = args[0].As<Number>()->Value();
    int num2 = args[1].As<Number>()->Value();

    //* C++ starts here

    int sum = num1 + num2;

    std::string returnString = addAString::explain(sum);

    //* C++ ends here

    args.GetReturnValue().Set(String::NewFromUtf8(isolate, returnString.c_str()));
}

void init(Local<Object> exports, Local<Object> method)
{
    NODE_SET_METHOD(method, "exports", add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init);