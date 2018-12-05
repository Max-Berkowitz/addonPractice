#include <node.h>

using namespace v8;

void add(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    int num1 = args[0].As<Number>()->Value();
    int num2 = args[1].As<Number>()->Value();

    //* C++ starts here

    int sum = num1 + num2;

    //* C++ ends here

    args.GetReturnValue().Set(Number::New(isolate, sum));
}

void init(Local<Object> exports, Local<Object> method)
{
    NODE_SET_METHOD(method, "exports", add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init);