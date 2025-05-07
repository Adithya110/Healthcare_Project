from django.urls import path
from .views import RegisterView,PatientDetailView,PatientListCreateView,DoctorListCreateView,DoctorDetailView,MappingListCreateView,MappingDeleteView,PatientMappingsView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('patients/', PatientListCreateView.as_view(), name='patient-list-create'),
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('doctors/', DoctorListCreateView.as_view(), name='doctor-list-create'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
    #patient-doctor mapping
    path('mappings/', MappingListCreateView.as_view(), name='mapping-list-create'),
    path('mappings/<int:pk>/', MappingDeleteView.as_view(), name='mapping-delete'),
    path('mappings/<int:patient_id>/doctors/', PatientMappingsView.as_view(), name='patient-mapping-list'),
]
