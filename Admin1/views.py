from django.shortcuts import render

# Create your views here.
def management(request):
    return render(request, 'admin.html')